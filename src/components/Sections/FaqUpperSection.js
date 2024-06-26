import React from "react";
import styled from "styled-components";
// Components
import ScheduleCallButton from "../Elements/Schedule";
// Assets
import Ms from '../../assets/img/developer.svg'

export default function FaqUpperSection() {
  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font40">Frequently Asked Questions.</h1>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
<img src={Ms}
        alt="ms"
        width="700px"
        />

        </ImageWrapper>

      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  
  width: 100%;
  min-height: 580px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    height: 50px;
    order: 2;
    margin-top: -150px;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 180px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    height: 10px;
    order: 1;
    margin-top: 90px;
  }
`;
const HeaderP = styled.div`
  max-width: 270px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 100px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;

