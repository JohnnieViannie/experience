import React, { useCallback } from 'react';
import styled from "styled-components";
import { CommunityTexts } from '../data/Data';

import FB from '../../assets/img/facebook.svg'
import RD from '../../assets/img/reddit.svg'
import Wall from '../../assets/img/wall2.svg'
import AddImage1 from "../../assets/img/add/bm.jpg";
import AddImage2 from "../../assets/img/add/bm1.jpg";
import AddImage3 from "../../assets/img/add/bm2.jpg";
import AddImage4 from "../../assets/img/add/bm3.jpg";
import FullButton from "../Buttons/FullButton";

const Community = () => {
    const renderIcons = useCallback((element) => {
        switch (element) {
            case 0:
                return <img alt="comunnity1" width="20" src={FB} />;
            case 1:
                return <img alt="comunnity2" width="20" src={Wall} />;
            case 2:
                return <img alt="comunnity3" width="20" src={RD} />;
            case 3:
                return <img alt="yes" width="20" src={Wall} />;
            default:
                return "";
        }
    }, []);

    return (
        <>
            <div className="lightBg">
                <div className="container">
                    <Advertising className="flexSpaceCenter">
                        <AddLeft>
                            <h4 className="font15 semiBold">{CommunityTexts.firstText}</h4>
                            <h2 className="font40 extraBold">{CommunityTexts.secondTextText}</h2>
                            <div className='text-steps-container'>
                                <h1 as="h1" className="second-text">
                                    {CommunityTexts.secondText}
                                </h1>
                                <ul className='steps-list'>
                                    {
                                        CommunityTexts.listOfSteps.map((step, index) => (
                                            <a href={step.link} key={index}>
                                                <li className='step'>
                                                    <p className={`step-icon ${index === 0 ? "bg-color2" : index === 1 ? "bg-color1" : "bg-color3"}`}>
                                                        {renderIcons(index)}
                                                    </p>
                                                    <p className='step-text'>
                                                        {step.text}
                                                    </p>
                                                </li>
                                            </a>
                                        ))
                                    }
                                </ul>
                            </div>
                            <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                                <div style={{ width: "190px" }}>
                                    <a href ="https://outlook.office.com/bookwithme/user/76c26b47e77a46718124e251901996d9@aseiug.org?anonymous&ep=plink "><FullButton title="Schedule a call" />
                           </a>     </div>
                                <div style={{ width: "190px", marginLeft: "15px" }}>
                                    <FullButton title="Submit project" action={() => alert("clicked")} border />
                                </div>
                            </ButtonsRow>
                        </AddLeft>
                        <AddRight>
                            <AddRightInner>
                                <div className="flexNullCenter">
                                    <AddImgWrapp1 className="flexCenter">
                                        <img src={AddImage1} alt="office" />
                                    </AddImgWrapp1>
                                    <AddImgWrapp2>
                                        <img src={AddImage2} alt="office" />
                                    </AddImgWrapp2>
                                </div>
                                <div className="flexNullCenter">
                                    <AddImgWrapp3>
                                        <img src={AddImage3} alt="office" />
                                    </AddImgWrapp3>
                                    <AddImgWrapp4>
                                        <img src={AddImage4} alt="office" />
                                    </AddImgWrapp4>
                                </div>
                            </AddRightInner>
                        </AddRight>
                    </Advertising>
                </div>
            </div>
        </>
    );
};

export default Community;

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
    top: -40px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp3 = styled.div`
  width: 20%;
  margin-left: 40%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp4 = styled.div`
  width: 30%;
  margin: 0 5%auto;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
