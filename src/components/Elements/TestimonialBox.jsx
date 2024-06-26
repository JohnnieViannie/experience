import React from "react";
import styled from "styled-components";
import QuoteIcon from "../../assets/svg/Quotes";

const TestimonialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  background-color: #eee;
  color: #333;
  border-radius: 15px;
  margin: 20px auto;
  padding: 50px;
  width: 100%;
  min-height: 230px;
  position: relative;

  .stars {
    font-size: 14px;
    color:gold;
  }

  .testimonial {
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: 900;
    height: 100%;
    line-height: 28px;
    margin: 0;
  }

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .user-image {
      border-radius: 50%;
      height: 80px;
      width: 80px;
      object-fit: cover;
    }

    .user-details {
      text-align: center;

      .username {
        margin: 0;
        font-size: 14px;
      }

      .role {
        margin: 0;
        font-size: 12px;
      }
    }
  }

  .progress-dots {
    display: flex;
    gap: 5px;

    .progress-dot {
      width: 5px;
      height: 5px;
      background-color: #eee;
      border-radius: 50%;
    }

    .progress-dot.active {
      background-color: #555;
    }
  }

  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    font-size: 10px;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
      background-color: #eee;
    }
  }

  #btn-prev {
    left: 25px;
  }

  #btn-next {
    right: 25px;
  }
`;

export default function TestimonialBox({ text, author, pic, location }) {
  return (
    <TestimonialContainer>


      <div className="stars">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <p className="testimonial">{text}</p>
      <div className="user">
        <img src={pic} alt="user" className="user-image" />
        <div className="user-details">
          <h4 className="username">{author}</h4>
          <p className="role">{location}</p>
        </div>
      </div>
      <div className="progress-dots" id="progress-dots"></div>
    </TestimonialContainer>
  );
}