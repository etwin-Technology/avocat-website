import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';

const Home = ({ language }) => {
  return (
    <>
      <Hero language={language} />
      <Services language={language} />
      <ContactForm language={language} />
    </>
  );
};

export default Home;