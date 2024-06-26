import React from "react";
import styled from "styled-components";

export default function ServiceBoxImages({image, title, subtitle}) {
  return (
    <Wrapper className="flex flexColumn">
      <IconStyle><img src={image} alt={title} width="270" height="150"/></IconStyle>
      <TitleStyle className="font25 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font20">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;