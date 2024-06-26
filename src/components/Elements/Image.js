import React from 'react';
import styled from 'styled-components';

// Styled components
const ImageContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const ImageOverlay = styled.div`

  top: 0;
  left: 0
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the overlay color and opacity here */
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire container */
`;

const Image = ({ src, alt, width, height }) => {
  return (
    <ImageContainer width={width} height={height}>
      <StyledImage src={src} alt={alt} />
      <ImageOverlay />
    </ImageContainer>
  );
};

export default Image;