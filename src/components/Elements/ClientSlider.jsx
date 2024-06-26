import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Assets
import ClientLogo01 from "../../assets/img/clients/p1.png";
import ClientLogo02 from "../../assets/img/clients/p2.png";
import ClientLogo03 from "../../assets/img/clients/p3.png";
import ClientLogo04 from "../../assets/img/clients/p4.png";
import ClientLogo05 from "../../assets/img/clients/p5.png";
import ClientLogo06 from "../../assets/img/clients/p6.png";

export default function ClientSlider() {
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const clientLogos = [
    { logo: ClientLogo01, link: "https://www.rmit.edu.au/" },
    { logo: ClientLogo02, link: "https://www.utwente.nl/en/" },
    { logo: ClientLogo03, link: "https://www.uts.edu.au/" },
    { logo: ClientLogo04, link: "https://www.calpoly.edu/" },
    { logo: ClientLogo05, link: "https://www.ucl.ac.uk/" },
    { logo: ClientLogo06, link: "https://www.unsw.edu.au/" },
  ];

  return (
    <div style={{ height: "200px" }} className="darkBg">
      <br />
      <br />
      <Slider {...settings}>
        {clientLogos.map((client, index) => (
          <a key={index} href={client.link} target="_blank" rel="noopener noreferrer">
            <LogoWrapper className="flexCenter">
              <ImgStyle src={client.logo} alt="client logo" />
            </LogoWrapper>
          </a>
        ))}
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  cursor: pointer;
  :focus-visible {
    outline: none;
    border: 0px;
  }
`;

const ImgStyle = styled.img`
  width: 200px;
  padding: 10%;
`;