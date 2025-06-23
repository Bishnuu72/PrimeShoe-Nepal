import React from 'react'
import SmallBanner from './SmallBanner';
import ContactDetails from './ContactDetails';

const Contact = ({mode, cardText, textColor, secColor}) => {
    let title = "Contact Us";
  return (
        <>
          <SmallBanner title={title} />
          <ContactDetails mode={mode} cardText={cardText} textColor={textColor} secColor={secColor} /> 
        </>
  )
}

export default Contact
