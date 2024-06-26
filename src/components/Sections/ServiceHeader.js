import React from "react";
import styled from "styled-components";
// Components

import {ServiceText} from "../data/Data"
import Ms from '../../assets/img/developer.svg'


export default function ServiceHeader() {
  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font40">{ServiceText.secondText}</h1>
          <HeaderP className="font20  semiBold">
 
{ServiceText.firstText}<br/>
{ServiceText.thirdText}
          </HeaderP>

        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
<img src={Ms}
        alt="Example2"
        width="700px"
        />

        </ImageWrapper>

      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  
  width: 100%;
  min-height: 600px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    texts-align: center;
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
    order: 1;
    margin-top: 90px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    texts-align: center;
    max-width: 100%;
  }
`;

const GreyDiv = styled.div`
  width: 30%;
  height: 350px;
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
