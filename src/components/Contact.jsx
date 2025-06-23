import React from 'react'
import SmallBanner from './SmallBanner';
import Footer from './Footer';
import ContactDetails from './ContactDetails';

const Contact = (props) => {
    let title = "Contact Us";
  return (
        <>
          <SmallBanner title={title} />
          <ContactDetails /> 
        </>
  )
}

export default Contact
