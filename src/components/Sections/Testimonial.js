import React from "react";
import styled from "styled-components";

import TestimonialSlider from "../Elements/TestimonialSlider";

export default function Testimony() {
  
  return (
    <div  className="container"style={{padding:"20px", paddingBottom:"50px"}}>
              <HeaderInfo>
            <h1 className="font40 flexCenter extraBold">Testimonials</h1>

          </HeaderInfo>
<TestimonialSlider/>
</div>
    )
  
};
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
