import React from "react";
import styled from "styled-components";
// Assets
import RollerIcon from "../../assets/svg/Services/RollerIcon";
import MonitorIcon from "../../assets/svg/Services/MonitorIcon";
import BrowserIcon from "../../assets/svg/Services/BrowserIcon";
import PrinterIcon from "../../assets/svg/Services/PrinterIcon";

export default function ValueBox({icon, title, subtitle}) {
  let getIcon;

  switch (icon) {
  case "roller":
    getIcon = <RollerIcon />;
    break;
  case "monitor":
    getIcon = <MonitorIcon />;
    break;
  case "browser":
    getIcon = <BrowserIcon />;
    break;
  case "printer":
    getIcon = <PrinterIcon />;
    break;
  case "1":
    getIcon = <b>1</b>;
    break;
  case "2":
    getIcon =<b>2</b>;
    break;
  case "3":
    getIcon =<b>3</b> ;
    break;
  case "4":
    getIcon = <b>4</b>;
    break;
  case "5":
    getIcon = <b>5</b>;
    break;
  default:
    getIcon = <RollerIcon />;
    break;
}


  return (
    <Wrapper className="flex flexColumn">
      <IconStyle>{getIcon}</IconStyle>
      <TitleStyle className="font25 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font20">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
 color: white;
 font-size: 35px;
 text-align: center;
 height: 70px;
 width: 70px;
 padding: 10px;
border-radius: 50%;
 background-color:#39B3CD;
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