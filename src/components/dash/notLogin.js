import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderContainer = styled.div`
  
  max-height: 100px;
`;

const Card = styled.div`
  padding: 10px;
`;

const Image = styled.img`
  width: 80%;
  max-height: 300px; /* Adjust as needed */
`;

const ImageOnlineSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slide transition speed (milliseconds)
    autoplay: true, // Autoplay slides
    autoplaySpeed: 3000, // Delay between slides during autoplay (milliseconds)
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true, // Show arrow navigation
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <Card>
              <Image src={`https://ni-experiences.com/server/${image}`} alt={`Slide ${index + 1}`} />
            </Card>
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default ImageOnlineSlider;