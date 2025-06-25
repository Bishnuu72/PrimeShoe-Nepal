import React from 'react'
import ServicesContext from './ServicesContext';

const ServicesData = ({children}) => {
    const services = [
    {
      _id: 1,
      title: "Premium Shoe Collection",
      icon: "fa-solid fa-shoe-prints fa-2x",
      description: "At Prime Shoe Nepal, we believe that great shoes lay the foundation for great style and confidence. That's why our premium collection is carefully curated to blend comfort, trend, and durability. Whether you're walking into an important meeting, heading out on an adventure, or just chilling with friends, our shoes are crafted to match your lifestyle. With a focus on both international and local brands, we provide something for everyone from classic sneakers to rugged boots.",
      point1: "Wide range of styles: sneakers, casuals, formals, and boots",
      point2: "Footwear for men, women, and kids of all ages",
      point3: "High-quality materials built for long-lasting comfort",
      point4: "Regular stock updates with the latest fashion trends",
      img: "/Services/shoe-collection.jpg",
    },
    {
      _id: 2,
      title: "Fast & Reliable Delivery",
      icon: "fa-solid fa-truck-fast fa-2x",
      description: "Your time matters. That’s why we’ve partnered with top logistics providers to offer quick, safe, and hassle-free delivery across Nepal. Whether you live in Kathmandu, Pokhara, or a remote district, we ensure your orders reach you as soon as possible. Our real-time tracking feature allows you to follow every step your order takes, giving you full transparency and peace of mind.",
      point1: "Delivery within 2–5 working days to most locations in Nepal",
      point2: "Real-time tracking and SMS/email notifications",
      point3: "Carefully packed shoes with protection for all weather conditions",
      point4: "Option to choose express or standard delivery at checkout",
      img: "/Services/delivery.jpg",
    },
    {
      _id: 3,
      title: "Hassle-Free Returns",
      icon: "fa-solid fa-rotate-left fa-2x",
      description: "We want you to be completely happy with your purchase. If the shoes don’t fit right or aren’t what you expected, our easy return and exchange policy has you covered. Just initiate a return within 7 days and we’ll handle the rest. Whether you want a refund, store credit, or a replacement, we make the process smooth and straightforward—with full support at every step.",
      point1: "7-day return and exchange policy—no questions asked",
      point2: "Return requests can be made directly through your profile",
      point3: "Choose refund, store credit, or exchange",
      point4: "Dedicated return support via live chat or phone",
      img: "/Services/hassle-return.jpg",
    },
    {
      _id: 4,
      title: "Customer Support",
      icon: "fa-solid fa-headset fa-2x",
      description: "Shopping online should feel personal, and that’s what our customer service is all about. Whether you’re facing a technical issue, need help finding your size, or want updates on your order—our support team is ready for you any time, any day. With multilingual support, we make sure that help is always accessible and easy to understand for every customer.",
      point1: "Live chat available 24/7 on our website and app",
      point2: "Phone and email support with fast response times",
      point3: "Friendly, trained support staff ready to assist you",
      point4: "Support available in both English and Nepali",
      img: "/Services/customer-support.jpg",
    },
    
  ];
  return (
    <ServicesContext.Provider value = {services}>
      {children}
    </ServicesContext.Provider>
  )
}

export default ServicesData
