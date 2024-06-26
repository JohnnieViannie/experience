import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ProjectSection from './projectSection';
import ProjectBox from "../Elements/ProjectBox";
import { Link } from 'react-router-dom';
import Card from "../Elements/Card";
 import {ProjectList} from "../data/Data"
export default function Projects() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper className="lightBg" id="projects">
      <div>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 flexCenter extraBold">Dive into  real-world projects.</h1>
          </HeaderInfo>
          <SliderWrapper>


<ProjectSection/>

          </SliderWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: auto;
`;

const SliderWrapper = styled.section`
  width: 100%;

`;
const HeaderInfo = styled.div`
padding: 20px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
