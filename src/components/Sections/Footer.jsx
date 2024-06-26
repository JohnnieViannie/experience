import React from "react";
import styled from "styled-components";
import { FooterTexts } from "../data/Data";
import LogoImg from "../../assets/img/logoe.png";

export default function Contact() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Wrapper>
      <div className="darkBg">
        <div className="diva">
          <InnerWrapper style={{ padding: "30px 0" }}>
            <LogoSection>
              <a href="#home" className="animate pointer">
                <img width="100" alt="yes" src={LogoImg} />
                <br/>
                <div className="font20" style={{ marginLeft: "10px" , paddingRight:"15px", }}>
                     <span style={{ color: "white" }}>
                  {" "}
                  {FooterTexts.underLogoText}
                </span>
                </div>
             
              </a>
            </LogoSection>
            <CompanySection>
              <SectionTitle>Product</SectionTitle>
              {FooterTexts.quickLinks.links.map((link, index) => (
                <StyledLink key={index} className="whiteColor animate pointer font13" href={link.url}>{link.name}</StyledLink>
              ))}
            </CompanySection>
            <ProductSection>
              <SectionTitle>Company</SectionTitle>
              {FooterTexts.contacts.links.map((link, index) => (
                <StyledLink key={index} className="whiteColor animate pointer font13" href={link.url}>{link.name}</StyledLink>
              ))}
            </ProductSection>
            <ProductSection>
              <SectionTitle>Legal</SectionTitle>
              {FooterTexts.legal.links.map((link, index) => (
                <StyledLink key={index} className="whiteColor animate pointer font13" href={link.url}>{link.name}</StyledLink>
              ))}
            </ProductSection>
            <ProductSection>
              <SectionTitle>
              Connect with us
              </SectionTitle>
              {FooterTexts.followus.links.map((link, index) => (
                <StyledLink key={index} className="whiteColor animate pointer font13" href={link.url}>{link.name}</StyledLink>
              ))}
            </ProductSection>
          </InnerWrapper>
          <FooterBottom>
            <CopyrightSection>
              <StyleP className="whiteColor font20 flexCenter">
                Copyright © {getCurrentYear()}. indEx. All rights reserved.
              </StyleP>
            </CopyrightSection>
          </FooterBottom>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 30px;
  }
`;
const LogoSection = styled.div`
  flex: 1;
  max-width: 43rem;
  margin-top: 14px;
  media (max-width: 768px) {
    margin-top: 1px;
  }
`;
const CompanySection = styled.div`
  flex: 1;
  margin-top: 15px;
  font-size: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 30px;
    margin-left: 10px;
  }
`;
const ProductSection = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;
const SectionTitle = styled.p`
  color: white;
  font-weight: bold;
`;
const StyleP = styled.p`
  margin-top: 20px;
`;

const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
  /* Ensures links are displayed in a column */
  font-size: 20px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-left: 30px;
  }
`;
const CopyrightSection = styled.div``;