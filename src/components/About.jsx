import React from 'react'
import SmallBanner from './SmallBanner'
import AboutContent from './AboutContent';
import Footer from './Footer';

const About = (props) => {
  let title = "About Us";
  return (
    <div className={`about bg-${props.mode} text-${props.cardText}`}>
      <SmallBanner title={title}/>
      <AboutContent />
    </div>
  )
}

export default About
