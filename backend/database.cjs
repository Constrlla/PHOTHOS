const express =  require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 4500

const { Schema }=mongoose; 
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))


mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.once('open', ()=> {
    console.log("mongodb connected sucsessfully")
})

const collectionSchema = new mongoose.Schema({
    name:String,
    link:String,
    date:Date
},{versionKey:false})

const collection = mongoose.model('activities',collectionSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'content.html'))
})

app.post('/post', async (req, res) => {
    const { content_name, link, date } = req.body; // Destructure req.body correctly
    const content = new collection({
        name: content_name, 
        link: link,
        date: date
    });

    await content.save(); 
    console.log(content); 
    res.send("Add Content success");
});


app.listen(port,()=>{
    console.log('Server Start on port :', port)
})
