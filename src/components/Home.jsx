import React from 'react';
import Banner from './Banner';
import Card from './Card';
import Form from "./Form";
import Footer from './Footer';
import AboutContent from './AboutContent';
import Product from './Product';
import ContactDetails from './ContactDetails';
import Services from './Services';
import ProductHome from './ProductHome';
import ServicesHome from './ServicesHome';


const Home = ({mode, cardText, cartToggleMode, cartMode, notify, toast, textColor, secColor }) => {
  return (
    <>
    <Banner />
    <Services mode={mode} cardText={cardText} />
    <Product mode={mode} cardText={cardText} />
    {/* <Product mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode} /> */}
    <AboutContent mode={mode} cardText={cardText} />
    {/* <Card mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode} /> */}
    {/* <Form mode={mode} cardText={cardText} notify={notify} toast={toast} /> */}
    <ContactDetails mode={mode} cardText={cardText} textColor={textColor} secColor={secColor} />
    </>
  )
}

export default Home
