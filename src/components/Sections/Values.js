import React from "react";
import styled from "styled-components";
// Components

import ServiceBox from "../Elements/ValueBox";

export default function Values() {
  return (
    <Wrapper id="services">

      <div className="lightBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 flexCenter extraBold">Our Values</h1>
            <p className="flexCenter font13">

            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="1"
                title="Innovation"
                subtitle="We challenge the status quo to create unique and challenging learning experiences"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="2"
                title="Trust"
                subtitle="We believe everyone on our team and partners can deliver work that reflects the standards that meet expectations of our clients."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="3"
                title="Integrity"
                subtitle="We are an honest team that up-holds moral values while doing work and interacting with customers"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox icon="4" title="Accountability" subtitle="We are answerable to all our stakeholders as a result of all the results and actions we take." />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
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
  }
`;
