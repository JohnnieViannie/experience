import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

export default function Learn() {
  const [modalOpen, setModalOpen] = useState(false);
  




  return (
    <div>
      <Wrapper className="animate pointer radius8" onClick={() => setModalOpen(true)}>
      Learn more
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#D0312D" : "#D0312D")};
  background-color: ${(props) => (props.border ? "transparent" : "#D0312D")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#D0312D" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#D0312D")};
    color: ${(props) => (props.border ? "#D0312D" : "#fff")};
  }
`;
