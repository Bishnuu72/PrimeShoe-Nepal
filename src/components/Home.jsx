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


const Home = ({mode, cardText, cartToggleMode, cartMode, notify, toast }) => {
  return (
    <>
    <Banner />
    <Services />
    <Product />
    {/* <Product mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode} /> */}
    <AboutContent />
    {/* <Card mode={mode} cardText={cardText} cartToggleMode={cartToggleMode} cartMode={cartMode} /> */}
    {/* <Form mode={mode} cardText={cardText} notify={notify} toast={toast} /> */}
    <ContactDetails />
    </>
  )
}

export default Home
