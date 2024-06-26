import React from "react";
import styled from "styled-components";

export default function Buttonz({ title, action, border }) {
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
  border: 1px solid ${(props) => (props.border ? "#022D36" : "#022D36")};
  background-color: ${(props) => (props.border ? "transparent" : "#022D36")};
  width: 100%;
  padding: 10px;
  outline: none;
  color: ${(props) => (props.border ? "#022D36" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#022D36")};
 
    color: ${(props) => (props.border ? "#022D36" : "#fff")};
  }
`;

