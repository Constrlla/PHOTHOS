import React, { useState } from "react";

const Accordion = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (id) => {
    setExpanded((prevExpanded) => (prevExpanded === id ? null : id));
  };

  const items = [


    {
      id: 1,
      question: "ทำอย่างไรเมื่อพบเห็นข้อมูลที่ไม่พึงประสงค์บนหน้าเว็บ",
      answer:
        "ไปที่ฟอร์มติดต่อสอบถามและรายงานข้อมูลที่ไม่พึงประสงค์เหล่านั้น",
    },
    {
      id: 2,
      question: "มั่นใจได้อย่างไรว่าเว็บไซต์ปลอดภัย",
      answer:
        "เราเอาขึ้น Hosting ด้วยผู้ให้บริการ `RENDER` ซึ่งใช้ SSL รับส่งข้อมูล, มีการป้องกัน DDoS นอกจากนี้เว็บไซต์เรายังใช้ฐานข้อมูลแยกกับฐานข้อมูลของโรงเรียนทั้งหมด",
    }
  ];

  return (
    <div className="container">
      <div className="accordion">
        {items.map((item) => (
          <div className="accordion-item" key={item.id}>
            <button
              id={`accordion-button-${item.id}`}
              aria-expanded={expanded === item.id ? "true" : "false"}
              onClick={() => toggleAccordion(item.id)}
            >
              <span className="accordion-title">{item.question}</span>
             
            </button>
            <div
              className="accordion-content"
              style={{
                opacity: expanded === item.id ? 1 : 0,
                maxHeight: expanded === item.id ? "10em" : 0,
                overflow: "hidden",
                transition: "opacity 200ms linear, max-height 200ms linear",
              }}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;