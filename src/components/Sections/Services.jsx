import React from "react";
import styled from "styled-components";
// Components
import ClientSlider from "../Elements/ClientSlider";
import ServiceBox from "../Elements/ServiceBox";

// Assets

export default function Services() {
  return (
    <Wrapper id="services">

      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 flexCenter extraBold">
            What does indEx Offer?
            </h1>
            <p className="font20 textCenter flexCenter">
Are you an Education Provider or Faculty looking for real-world industry experiences for your students? Or perhaps a student looking to enhance your knowledge to support Industry and their challenges, helping solve problems that match your interests and career prospects? This is how indEX can support you through your education journey.
            
            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="roller"
                title="Vetted Experiences"
                subtitle="Our platform has a pool of carefully selected industry projects to provide students with valuable experience."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="monitor"
                title="Industry Collaboration"
                subtitle="We collaborate with education players to align industry projects with academic curriculum, ensuring students gain relevant skills and knowledge."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="browser"
                title="Exchange Opportunities"
                subtitle="Opportunities with students being able to collaborate with other students from other universities on project activities.
                "
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox icon="printer" title="Tailored Projects" subtitle="We tailor project opportunities to match students' skills and interests, maximizing their learning and development" />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
                  <h2 className="font40 flexCenter textCenter extraBold">Trusted by the world's leading education providers</h2>
        </div>

    <ClientSlider/>
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
