import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
font-size: 20px;
  border: 1px solid ${(props) => (props.border ? "#D0312D" : "#D0312D")};
  background-color: ${(props) => (props.border ? "transparent" : "#D0312D")};
  width: 100%;
  padding: 10px;
  outline: none;
  color: ${(props) => (props.border ? "#D0312D" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#D0312D")};
 
    color: ${(props) => (props.border ? "#D0312D" : "#fff")};
  }
`;

