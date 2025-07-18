import React from "react";
import BlogImg from "../assets/img1.jpg";

const Blog1 = () => {
  const Blogs = [
    {
      id: 1,
      title: "Blog 1",
      description: "This is the first blog post",
    },
    {
      id: 2,
      title: "Blog 2",
      description: "This is the second blog post",
    },
    {
      id: 3,
      title: "Blog 3",
      description: "This is the third blog post",
    },
    {
      id: 4,
      title: "Blog 4",
      description: "This is the fourth blog post",
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
                                <div className="card">
                                    <img src={BlogImg} alt="" />
                                    <div className="card-details">
                                        <h5 className="card-title">{item.title}</h5>
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

export default Blog1