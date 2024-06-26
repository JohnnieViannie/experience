import React from "react";
import styled from "styled-components";
// Components
import Image1 from '../../img/serv.png';
import Image2 from '../../img/serv2.png';
import Image3 from '../../img/serv3.png';
import Image4 from '../../img/serv4.png';
import ClientSlider from "../Elements/ClientSlider";
import ServiceBoxImages from "../Elements/ServiceBoxImages";

// Assets

export default function Services() {
  return (
    <Wrapper id="services">

      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 flexCenter extraBold">
            Our special services.
            
            </h1>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBoxImages
                image={Image4}
                title="Mentorship"
                subtitle="With our extensive industry network, we facilitate the exchange of valuable knowledge spanning a wide range of sectors"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBoxImages
                image={Image3}
                title="Challenges"
                subtitle="We collaborate with industry to create problem-based projects that empower students to tackle real-world problems head-on"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBoxImages
                image={Image2}
                title="Experience"
                subtitle="Together with our partners, we organise immersive in-person learning experiences valuable to students"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBoxImages
              image={Image1} title="Research" subtitle="We collaborate closely with industry to create problem-based challenges and projects that empower students to tackle real-world problems head-on"/>
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>

      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  media (max-width: 760px) {
   
  }
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
    margin-top:-180px;
  }
`;
