import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import SmallBanner from './SmallBanner';

const News = (props) => {
    
    const [articles, setArticles] = React.useState([]);

    const getData = async() => {
        try {
            const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=cb1739be3d9d46fd9e4970dbdaae6d06");
            const data = await response.json();
            console.log(data);
            setArticles(data.articles);

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getData()
    }, []);

    let title = "Latest News";

  return (
    <>
    <div className={`news-section bg-${props.mode} text-${props.cardText} fcb-font`}>
        <SmallBanner title={title} />
        <div className="container">
        <div className="row">
        {articles ?
        articles.map((item) => {
            console.log(item);
            return (
                <div className="col-md-3">
                    <div className="card card-style">
                        {item.urlToImage && (
                            <img src={item.urlToImage} alt="Api Images" />
                        )}

                        <div className={`card-body bg-${props.mode} text-${props.cardText}`}>
                            <p>Author Name - {item.author} <br /> Published At - {item.publishedAt}</p>
                            <h4>{item.title}</h4>
                            {/* <p>{item.description}</p> */}
                            <a href={item.url} target="_blank" rel='noopener noreferrer' className='card-readmore' >Read More</a>
                        </div>
                    </div>
                </div>      
                )
            })
            : <p>Loading News...</p>}
    </div>
    </div>
    </div>
    </>
  );
}

export default News
