import React from 'react'
import SmallBanner from './SmallBanner';
import BlogCards from './BlogCards';
import Footer from './Footer';

const Blog = (props) => {
    let title = "My Blogs";
  return (
<div className={`blog-page bg-${props.mode}`}>
       <SmallBanner title={title}/>
       <div className="container">
        <div className={`blog-details text-${props.cardText}`}>
            <p>Stay ahead in the world of online shopping with our latest blogs! Discover expert tips on smart shopping, product guides, fashion trends, tech reviews, seasonal deals, and more. Whether you're looking for buying advice or style inspiration, our blog is here to help you shop smarter and live better.</p>
        </div>
       </div>
       <BlogCards />
    </div>
  )
}

export default Blog
