import React from "react";
// Sections

import AboutSection from "../components/Sections/AboutSection";
import AboutMiddle from "../components/Sections/AboutMiddle";
import Projects from "../components/Sections/Projects";
import Product from "../components/Sections/Product";
import Values from "../components/Sections/Values";

export default function About() {
  return (
    <>
      <AboutSection />
      <AboutMiddle/>
      <Product/>
      <Values/>
      <Projects/>

    </>
  );
}


