import React from "react";
import styled from "styled-components";
import FullButton from "../Buttons/FullButton";

import AddImage1 from "../../assets/img/add/bm.jpg";
import Pro1 from "../../assets/img/pro2.png";
import Pro2 from "../../assets/img/pro.png";

export default function  AboutMiddle (){
return (
         <div className="about darkBg ">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>

                <h2 className="font40 whiteColor textCenter extraBold">Our Philosophy</h2>
                <Magret>
                <ul className="leftor font20">
                <div className="flexCenter">
               <img width="80" src ={Pro1}/>
                </div>
<li>
We believe industry plays a huge role in producing job-ready graduates for the present and the future. 
</li>
<li>
We believe industry should shape what is taught in the classroom. We make finding talent and industry engagement opportunities easy.
</li>
<li>We put the needs of both the students, universities and industry at the heart of everything we do
</li>
</ul>
    </Magret>  
    
    <br/><br/>

                                <h2 className="font40 whiteColor textCenter extraBold">Our Product</h2>
                                                <Magret>
                                <ul className="font20 leftor">
                                                <div className="flexCenter">
               <img width="80" src ={Pro2}/>
                </div>
<p>
indEx connects students and  researchers to industry and vice versa. Through our platform, students and universities can browse and book experiential learning opportunities to work on real world projects ran by industry. 
</p>
                                </ul>
</Magret>
              </AddLeft>
              <AddRight>
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <img src={AddImage1} alt="office" />
                    </AddImgWrapp1>
                  </div>
                </AddRightInner>
              </AddRight>
            </Advertising>
          </div>
        </div>
  
  )
  
};

const Magret= styled.p`
  position: relative;
  z-index: 1;
  padding: 30px;
  height: 100%;
  background-color: white;
  color: black;
  border-radius: 20px;
  margin: 0;
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -20px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 68%;
  margin-left: 15%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
