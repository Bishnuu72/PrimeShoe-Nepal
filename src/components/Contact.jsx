import React from 'react'
import SmallBanner from './SmallBanner';
import ContactDetails from './ContactDetails';

const Contact = ({mode, cardText, textColor, secColor}) => {
    let title = "Contact Us";
  return (
        <div className='fcb-font'>
          <SmallBanner title={title} />
          <ContactDetails mode={mode} cardText={cardText} textColor={textColor} secColor={secColor} /> 
        </div>
  )
}

export default Contact
