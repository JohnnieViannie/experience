import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Components
import TestimonialBox from "../Elements/TestimonialBox";
import {TestimonialTexts} from "../data/Data"
export default function TestimonialSlider() {


  const settings = {
  infinite: true,
  speed: 400,
  slidesToShow: 1, // Adjust the number of slides to show
  slidesToScroll: 1, // Adjust the number of slides to scroll
  arrows: false,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 4000, // Set autoplay speed to 2000 milliseconds (2 seconds)
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  return (
    <div>
      <Slider {...settings}>
        {TestimonialTexts.feedBacks.map((testimonial, index) => (
          <LogoWrapper key={index} className="flexCenter">
            <TestimonialBox
            text={testimonial.text} 
            author={testimonial.person} 
            pic={testimonial.pic}
            location={testimonial.location}
            />
          </LogoWrapper>
        ))}
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  width: 90%;
  padding: 0 5%;
  cursor: pointer;
  :focus-visible {
    outline: none;
    border: 0px;
  }
`;