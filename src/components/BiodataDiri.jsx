import React from 'react';
import Header from './Header';
import AboutMe from './AboutMe';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contacts';
import './custom.css';

const BiodataDiri = () => {
  return (
    <div className="portfolio-container">
      <Header />
      <div className="content-section">
        <AboutMe />
        <Education />
        <Skills />
        <Projects />
      </div>
      <Contact />
    </div>
  );
};

export default BiodataDiri;