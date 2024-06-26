import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Buttonz from "../Buttons/Buttonz";
// Components
import { Link } from 'react-router-dom';
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
import {NavLinks} from "../data/Data"
// Assets

import LogoIcon from "../../assets/img/logow.png";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container link flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="/home" smooth={true}>
            <img alt="logo" style= {{marginTop:"-10px"}} width ="120" src={LogoIcon}/>
            <div className="Button1">
              
              <Link to = "/signup">
           <Buttonz title="Get started free"   />
           </Link>
                    </div>
                    </Link>
          
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
<UlWrapper className="flexNullCenter">
  {NavLinks.map((link, index) => (
        <a href={link.to}  rel="noopener noreferrer" style={{ padding: "10px 15px" }}>
    <li className="semiBold font15 pointer" key={index}>

        {link.text}

    </li>
          </a>
  ))}
</UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <a href="/login" style={{ padding: "10px 30px 10px 0" }}>
                Login
              </a>
            </li>
           {/** <li className="semiBold font15 pointer flexCenter">
              <a href="https://outlook.office.com/bookwithme/user/76c26b47e77a46718124e251901996d9@aseiug.org?anonymous&ep=plink" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                Schedule a call
              </a>
            </li>**/}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;