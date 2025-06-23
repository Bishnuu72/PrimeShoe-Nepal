import React from "react";

const Cats = () => {

  const [news, setNews] = React.useState([]);
  const fetchData = async() => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
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
                    {news &&
                    news.map((item) => {
                        return(
                            <div className="col-md-3">
                                <div className="card cats-card">
                                    <img src={item.url} alt="Cats images" />
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

export default Cats