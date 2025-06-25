import React from "react";
import BlogImg from "../assets/blog-shoe.jpg";

const BlogCards = ({mode, cardText}) => {
  const Blogs = [
    {
      id: 1,
      title: "Blog 1",
      description: "This is the first blog post",
      img: "/blogImages/blog1.jpg",
    },
    {
      id: 2,
      title: "Blog 2",
      description: "This is the second blog post",
      img: "/blogImages/blog-shoe.jpg",
    },
    {
      id: 3,
      title: "Blog 3",
      description: "This is the third blog post",
      img: "/blogImages/blog2.jpg",
    },
    {
      id: 4,
      title: "Blog 4",
      description: "This is the fourth blog post",
      img: "/blogImages/blog3.jpg",
    },
    {
      id: 5,
      title: "Blog 5",
      description: "This is the fifth blog post",
      img: "/blogImages/blog4.jpg",
    },
    {
      id: 6,
      title: "Blog 6",
      description: "This is the sixth blog post",
      img: "/blogImages/blog5.jpg",
    },
  ];

  const [news, setNews] = React.useState([]);
  const fetchData = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = await response.json();
    console.log("This is photos from Api", data);
    setNews(data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
        <div className="blog-section">
            <div className="container">
                <div className="row">
                  <h4>{news.title}</h4>
                    {Blogs &&
                    Blogs.map((item) => {
                        return(
                            <div className="col-md-3">
                                <div className={`card bg-${mode} text-${cardText}`}>
                                    <img src={item.img} alt="" />
                                    <div className="card-details">
                                        <h5 className={`card-title bg-${mode} text-${cardText}`}>{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <button className="card-btn">Read More</button>
                                    </div>
                                </div>
                            </div>
                            )
                    })
                }
                </div>
            </div>
        </div>
  );
};

export default BlogCards