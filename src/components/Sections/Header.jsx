import React from "react";
import styled from "styled-components";
// Components
import { Link } from 'react-router-dom';
import Learn from "../Elements/Learn";
// Assets
import FullButton from "../Buttons/FullButton";
import VideoWithOverlay from "../Elements/Video";


export default function Header() {
  return (
    <>
      <Wrapper id="home" className="container flexSpaceCenter">
        <LeftSide className="flexCenter">
          <div>
            <HeaderP className="font30 textCenter semiBold">
              Our  platform allows collaboration between Industry and Education Providers to deliver unique, hands-on student learning experiences.
                          <Link to="/about">
                <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0"}}>
                  <div style={{ width: "190px" }}>
                  <Link to ="/about">
                    <FullButton title="Learn more" />
                    </Link>
                  </div>
                  <div style={{ width: "190px", marginLeft: "15px" }}>
                  <Link to ="/signup">
                    <FullButton title="Sign up"  border />
                    </Link>
                  </div>
                </ButtonsRow>
            </Link>
            </HeaderP>
          </div>
        </LeftSide>
        <RightSide>
          <ImageWrapper>
            <VideoWithOverlay/>
          </ImageWrapper>

        </RightSide>
      </Wrapper>
    </>
  );
}


const Wrapper = styled.section`
  
  margin-top: 180px;
  width: 100%;
  min-height: 370px;
  @media (max-width: 960px) {
    flex-direction: column;
    margin-top: 1px;
   
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 120px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 120px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 5px 1px 10px 1px; /* Adjusted the bottom padding from 5px to 20px */
  line-height: 2.5rem;
  @media (max-width: 960px) {
    margin-top: -2rem;
    padding: 15px 0 30px 0; /* Adjusted the bottom padding from 50px to 30px */
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
margin: 80px auto 0;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 500px;
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
