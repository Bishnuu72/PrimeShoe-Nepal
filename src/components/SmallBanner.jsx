import React from 'react'
import Smallbanner from "../assets/smallBanner.jpg";

const SmallBanner = (props) => {
  return (
    <div image-container>
      <img src={Smallbanner} alt="Background image" className='small-banner' />
      <div className='page-title'>{props.title}</div>
    </div>
  )
}

export default SmallBanner
