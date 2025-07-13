import React, { useReducer } from 'react'
import ProductContext from './ProductContext'
import { cartReducer } from './Reducer';

const ProductState = (props) => {
  // const BACKEND_URL = process.env.VITE_BACKEND_URL;
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const products = [
    {
    _id:1,
    name: "Football Boots",
    description: "High-performance football boots built for speed, grip, PowerPlay and precision on every type of playing surface.",
    price: 2500,
    instock: 7,
    img: "/ShoesImages/football-shoes.jpg",
    color:"Black/White, Red/Black, Blue/Neon Yellow, White, Orange/Black, Green/Silver, Custom Editions",
    intro:"Football boots, also known as soccer cleats, are essential footwear designed to enhance a player's performance on the field. Engineered for speed, control, and comfort, these boots feature studs or blades on the sole to provide optimal grip on grass, turf, or artificial surfaces. Modern football boots are crafted using lightweight materials that allow players to move swiftly while maintaining ball control and foot stability. Available in various styles and stud configurations, they cater to different playing positions and pitch conditions. Whether you're a striker, midfielder, or defender, the right pair of football boots can elevate your game.",
  },
  {
    _id:2,
    name: "Sneaker Fashion Shoes",
    description: "Stylish and comfortable sneakers blending street fashion with everyday wear, perfect for casual and trendy looks.",
    price: 1200,
    instock: 5,
    img: "/ShoesImages/sneaker-fashion-shoes.jpg",
    color: "White, Black, Grey, Red, Blue, Green, Multi-color",
    intro: "Sneaker fashion shoes are more than just footwear—they're a cultural statement and a style essential. Originally built for sports, sneakers have evolved into a versatile fashion trend worn by people of all ages. Designed with comfort, durability, and aesthetic appeal, these shoes pair effortlessly with jeans, joggers, shorts, or even semi-formal outfits. From minimalist designs to bold, eye-catching colorways, sneaker fashion embraces individuality and modern trends. Popular among youth and fashion-forward individuals, they are ideal for daily wear, walking, and social outings. Whether you're heading to college, a casual hangout, or a city stroll, sneakers keep your style sharp and relaxed.",
  },
  {
    _id:3,
    name: "Red Converse",
    description: "Bold red Converse sneakers offering iconic style, everyday comfort, and timeless appeal for casual streetwear lovers.",
    price: 5000,
    instock: 3,
    img: "/ShoesImages/red-converse.jpg",
    color: "Red, Black, White, Navy Blue, Maroon, Grey, Pink",
    intro: "Red Converse shoes are a classic fashion staple that combines bold expression with vintage charm. Instantly recognizable by their canvas body, rubber toe cap, and signature star logo, these sneakers have transcended generations and cultures. The vibrant red color adds a confident, eye-catching edge to any outfit—whether paired with jeans, shorts, or dresses. Comfortable, lightweight, and versatile, Red Converse are perfect for casual outings, concerts, or urban streetwear looks. Loved by artists, skaters, and trendsetters, they symbolize individuality and effortless cool. From high-tops to low-cuts, Red Converse remain a go-to choice for timeless, everyday fashion with attitude.",
  },
  {
    _id:4,
    name: "White Sneakers",
    description: "Classic white Converse sneakers delivering clean, versatile style with unmatched comfort for everyday casual wear.",
    price: 1500,
    instock: 8,
    img: "/ShoesImages/white-sneakers.jpg",
    color: "White, Black, Red, Cream, Light Blue, Olive Green, Beige",
    intro: "White Converse sneakers are a timeless symbol of simplicity, versatility, and effortless cool. Known for their minimal design and iconic rubber sole, they easily complement any outfit—from streetwear to semi-casual attire. Whether it’s high-tops or low-tops, their clean white look adds freshness and modern flair to your style. Lightweight and breathable, they’re perfect for daily wear, college, hangouts, or city walks. A favorite among creatives, students, and fashion enthusiasts, white Converse shoes have stood the test of time and trends. Durable and iconic, they continue to represent individuality, freedom, and self-expression with every step you take.",
  },
  
  ];

  const [product, setProduct] = React.useState(products);
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  })
  
  const allProduct = async (searchQuery="") => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/allhomeproduct?searchQuery=${searchQuery}`,{
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProduct(data);
      console.log("Data from backend response", data);
    } catch (error) {
      console.log("error: ", error);
      // res.status(500).send("Internal Server Error");
    }
  };

  //For only users products
  const userProduct = async (searchQuery="") => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/allproduct?`,{
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProduct(data);
      console.log("Data from backend response", data);
    } catch (error) {
      console.log("error: ", error);
      // res.status(500).send("Internal Server Error");
    }
  };

  //Edit Product
  const editProduct = async (id, updateData) => {
    const {name, description, price, instock} = updateData;
    try {
      const response = await fetch(`http://localhost:5000/api/product/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "content-Type" : "application/json",
            "auth-token" : localStorage.getItem("token"),
          },
          body: JSON.stringify({name, description, price, instock})
        }
      );
      const data = await response.json();
      console.log("edited data", data);
      allProduct();
    } catch (error) {
      console.log("Internal server error", error);
      throw new Error("Failed to update product");
    }
  }

  //Delete Product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/deleteproduct/${id}`,{
        method: "DELETE",
        headers: {
          "content-Type" : "application/json",
          "auth-token" : localStorage.getItem("token"),
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data deleted", data);
      allProduct();
    } catch (error) {
      console.log("Error",error);
      throw new Error("Failed to delete product");
      
    }
  };

  return (
    <ProductContext.Provider value={{product, setProduct, state, dispatch, allProduct,userProduct, editProduct, deleteProduct}}>
      {props.children}

    </ProductContext.Provider>
  )
};

export default ProductState
