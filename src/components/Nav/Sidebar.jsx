import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
// Assets
import {NavLinks} from "../data/Data"
import CloseIcon from "../../assets/svg/CloseIcon";

import LogoIcon from "../../assets/img/logoe.png";
export default function Sidebar({ sidebarOpen, toggleSidebar }) {


  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <img alt="logo" width="120" src={LogoIcon} />
      
        </div>

        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexColumn">
        {NavLinks.map((link, index) => (
          <li  className="semiBold font20 pointer" key={index}>
            <Link 
              onClick={() => toggleSidebar(!sidebarOpen)}
              activeClass="active"
              className="whiteColor"
              style={{ padding: "10px 15px" }}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-60}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </UlStyle>

      <UlStyle className="flexSpaceCenter">
      <Link onClick={() => toggleSidebar(!sidebarOpen)} to = "/login">
        <li style={{ marginLeft: "18px" }} className="semiBold font20 pointer">
          <a href="/" style={{ padding: "10px 30px 10px 0" }} className="whiteColor">
            Login
          </a>
        </li>
        </Link>
        <Link onClick={() => toggleSidebar(!sidebarOpen)} to ="./signup">
        <li className="semiBold font20 pointer flexCenter">
          <a  className="radius8 lightBg" style={{ padding: "10px 15px" }}>
            Get Started
          </a>
        </li>
        </Link>
      </UlStyle>
    </Wrapper>
  );

}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding-top: 40px;
padding-right: 40px;
padding-bottom: 40px;
  align-text: left;
  
  li {
    margin: 20px 0;
  }
`;
