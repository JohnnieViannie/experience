import React from 'react';
import Location from "../../assets/img/location.svg"
import Book from "../../assets/img/pj.png";

const Card = ({ imageUrl, title, description, status, location, type1, type2, type3 }) => {
  return (
    <div class="showcase">
      <span class="travel-card">
        <div class="image">
          <img src={imageUrl} />
        </div>
        <div class="content">
          <ul class="breadcrumbs">
            <li class="breadcrumbs-item">{type1}</li>
            <li class="breadcrumbs-item">{type2}</li>
            <li class="breadcrumbs-item">{type3}</li>
          </ul>
          <p class="topic">{description}</p>
          <div class="informationCard1"></div>
          <div class="recommendation" >
            <div style={{ backgroundColor: status === 'Booked' ? '#D0312D' : 'green' }} class="score">{status}</div>
          </div>
          <div class="price">
            <div className="original-price" style={{ display: 'flex', alignItems: 'left', marginLeft: "-15px" }}>
              <span className="location" style={{ display: 'flex', alignItems: 'center' }}>
                <img width="40" src={Location} alt="bim" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                {location}
              </span>
            </div>
            <div class="discount-info">
              <img width="30" alt="bv" src={Book} />
            </div>
          </div>
        </div>
        <div class="button-favorite">
          <span class="category">{title}</span>
        </div>
      </span>
    </div>
  );
}

export default Card;