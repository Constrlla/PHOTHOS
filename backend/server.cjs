require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 5000; // Unified server port

// Middleware
app.use(cors());
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.static(__dirname)); // Serve static files

// MongoDB Connection
console.log('MongoDB URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
}).catch(error => console.error("MongoDB connection error:", error));

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// ---- USER AUTHENTICATION ----

// User Schema and Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'member' },  // Added role field
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('users', UserSchema);

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check user existence
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get user role (after login)
app.get('/api/userRole', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ role: user.role }); // Return the user's role
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ---- ACTIVITIES MANAGEMENT ----

// Activities Schema and Model
const ActivitySchema = new mongoose.Schema(
  {
    name: String,
    link: String,
    date: Date,
  },
  { versionKey: false }
);

const Activity = mongoose.model('activities', ActivitySchema);

// Fetch Activities Route
app.get('/api/items', async (req, res) => {
  try {
    const items = await Activity.find({});
    res.setHeader('Content-Type', 'application/json');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Activity Route (Form Submission)
app.post('/post', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied, admin role required' });
    }

    const { content_name, link, date } = req.body;
    const activity = new Activity({
      name: content_name,
      link: link,
      date: date,
    });
    await activity.save();
    console.log('Activity added:', activity);
    res.status(200).json({ success: true, message: ` "${content_name}" ถูกเพิ่มเรียบร้อยแล้ว` });
  } catch (error) {
    console.error('Error adding content:', error);
    res.status(500).json({ success: false, message: 'Error saving content' });
  }
});

app.put('/api/update/:id', async (req, res) => {
  try {
    const updatedItem = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error); // Log the error details
    res.status(500).json({ message: 'An error occurred while updating the item', error: error.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Activity.findByIdAndDelete(id);
    res.json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
