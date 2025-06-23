import React from 'react'
import ServicesContext from './ServicesContext';

const ServicesData = ({children}) => {
    const services = [
    {
      _id: 1,
      title: "Pet Grooming",
      icon: "fa-solid fa-scissors",
      description: "Professional grooming services to keep your pets looking and feeling their best.",
      point1: "Bathing and drying",
      point2: "Hair trimming and styling",
      point3: "Nail clipping",
      point4: "Ear cleaning",
      img: "/Services/pet-gromming.jpg",
    },
    {
      _id: 2,
      title: "Veterinary Care",
      icon: "fa-solid fa-stethoscope",
      description: "Comprehensive health check-ups and medical services.",
      point1: "Routine examinations",
      point2: "Vaccinations",
      point3: "Emergency care",
      point4: "Health consultations",
      img: "/Services/veterinary-care.jpg",
    },
    {
      _id: 3,
      title: "Pet Boarding",
      icon: "fa-solid fa-house",
      description: "Safe and comfortable boarding facilities for your pets when you're away.",
      point1: "Spacious accommodations",
      point2: "Regular feeding and exercise",
      point3: "24/7 supervision",
      point4: "Daily pet updates via WhatsApp",
      img: "/Services/pet-boarding.jpg",
    },
    {
      _id: 4,
      title: "Training & Behavior",
      icon: "fa-solid fa-dog",
      description: "Expert training programs to ensure well-behaved pets.",
      point1: "Obedience training",
      point2: "Behavior modification",
      point3: "Puppy training classes",
      point4: "Leash walking & socialization",
      img: "/Services/training-behaviour.jpg",
    },
  ];
  return (
    <ServicesContext.Provider value = {services}>
      {children}
    </ServicesContext.Provider>
  )
}

export default ServicesData
