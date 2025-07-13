import React from "react";

const FaqSection = ({mode, cardText, secColor}) => {

    const faqData = [
        {
            question: "Q.1 What types of sports equipment do you sell?",
            answer: "We sell gear for football, cricket, basketball, badminton, and more - from beginner to pro level.",
        },
        {
            question: "Q.2 Do you provide custom team kits?",
            answer: "Yes! We create personalized jerseys, kits, and accessories for schools, clubs, and teams.",
        },
        {
            question: "Q.3 Can I return or exchange a product?",
            answer: "Absolutely! You can return unused products within 7 days. Easy returns guaranteed.",
        },
        {
            question: "Q.4 Do you deliver outside Kathmandu?",
            answer: "Yes, we deliver all over Nepal through reliable courier services with standard delivery charges.",
        },
        {
            question: "Q.5 Is there a discount on bulk orders?",
            answer: "Yes, we offer special discounts on bulk purchases. Please contact us for more details.",
        },
        {
            question: "Q.6 How long does delivery take?",
            answer: "Delivery within Kathmandu takes 2–3 days; outside valley delivery may take 4–6 working days.",
        },
        {
            question: "Q.7 Do you offer cash on delivery?",
            answer: "Yes, we offer cash on delivery within Kathmandu Valley for added convenience and secure transactions.",
        },
        {
            question: "Q.8 What if my product is damaged?",
            answer: "If your product is damaged on delivery, contact us immediately for a replacement or refund.",
        },
    ];

  return (
    <div className={`faqs-section bg-${mode} text-${cardText}`}>
    <div className="container fcb-font" style={{ paddingTop: "30px" }}>
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">

        {faqData.map((item, index) => (
          <div className={`accordion-item bg-${secColor} text-${cardText}`} key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}

      </div>
    </div>
    </div>
  );
};

export default FaqSection;
