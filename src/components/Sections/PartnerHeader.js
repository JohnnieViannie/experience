import React from "react";
import styled from "styled-components";
// Components
import SearchBar from "../Elements/SearchBar";
// Assets
import Ms from '../../assets/img/developer.svg';

export default function PartnerHeader() {
  return (
     <Wrapper id="home" className="container flexSpaceCenter">

      <RightSide>
        <div style={{float:"right"}}>
          <h1 style={{fontSize:"3rem"}}className="extraBold ">Partnering to deliver.</h1>


        </div>
      </RightSide>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  min-height: 540px;
  position: relative; /* Added */
  background-image: url('ha.png'); /* Specify your image path */
  background-size: cover; /* Added */
  background-position: center; /* Added */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 20px; /* Adjust as needed */
  box-sizing: border-box; /* Added */
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
  width: 10%;
  height: 10%;
  z-index: 1; 
  
`;

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  z-index: 1; 
 
  margin-top: 120px;
  margin-left: 59px;
    @media (max-width: 960px) {
    margin-top: 300px;
    font-size: 10px;
  }
`;

const HeaderP = styled.p` /* Changed from div to p */
  max-width: 17rem;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  color: white; /* Adjust text color */
`;

const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent grey color */
  @media (max-width: 960px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 1; /* Ensure image is above the background color */
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;