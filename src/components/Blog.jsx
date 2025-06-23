import React from 'react'
import SmallBanner from './SmallBanner';
import BlogCards from './BlogCards';
import Footer from './Footer';

const Blog = ({mode, cardText}) => {
    let title = "My Blogs";
  return (
<div className={`blog-page bg-${mode}`}>
       <SmallBanner title={title}/>
       <div className="container">
        <div className={`blog-details text-${cardText}`}>
            <p>Stay ahead in the world of online shopping with our latest blogs! Discover expert tips on smart shopping, product guides, fashion trends, tech reviews, seasonal deals, and more. Whether you're looking for buying advice or style inspiration, our blog is here to help you shop smarter and live better.</p>
        </div>
       </div>
       <BlogCards mode={mode} cardText={cardText} />
    </div>
  )
}

export default Blog
