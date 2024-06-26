import React from "react";
import styled from "styled-components";
import ServiceBox from "../Elements/ServiceBox";
import {ProductTexts} from "../data/Data";
import "../../style/product.css"
export default function Product() {

  
  
  return (
    <Wrapper id="services">

      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 flexCenter extraBold">How we work</h1>

          </HeaderInfo>
          <ServiceBoxRow className="flex">
          <section className="section">
      <div className="row">
        {ProductTexts.listOfSteps.map((service, index) => (
          <div className="column" key={index}>
            <div className="cardz">
              <div className="icon-wrapper">
                <i className={service.icon}></i>
              </div>
<br></br>
              <p>
                {service.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
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
