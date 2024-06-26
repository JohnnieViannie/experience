import React, {useEffect, useState} from "react";
import axios from "axios"

import Slider from "react-slick";
import OneP from "../../assets/img/projects/t1.jpg";
import TwoP from "../../assets/img/projects/t2.jpg";
import ThreeP from "../../assets/img/projects/t3.jpg";
import FourP from "../../assets/img/projects/t4.jpg";
import FiveP from "../../assets/img/projects/t5.jpg";
import { Link } from 'react-router-dom';
const RightContent = () => {
   
  const activityClasses = ['one', 'two', 'three', 'four'];
  const[projects, setprojects ] = useState([]);
  
  
  
  const formatDate = (dateString) => {
  const dateParts = dateString.split(": ");
  const month = new Date(dateParts[1]).toLocaleString('en-US', { month: 'long' });
  const year = dateParts[2];
  return `${month} ${year}`;
};
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000 // Change slide interval here (in milliseconds)
  };
  
    const activities = [
    { day: "13", dayOfWeek: "mon", name: "Land marking", participants: ["img-url1", "img-url2", "img-url3", "img-url4"] },
    { day: "15", dayOfWeek: "wed", name: "Moutain mapping", participants: ["img-url1", "img-url2"] },
    { day: "17", dayOfWeek: "fri", name: "Development of coffee", participants: ["img-url1", "img-url2", "img-url3"] },
    { day: "18", dayOfWeek: "sat", name: "Water acess", participants: ["img-url1", "img-url2", "img-url3", "img-url4", "img-url5"] }
  ];

  return (
    <div className="left-content">
     { <div className="activities">
        <h1>Popular projects categories</h1>
        <div className="activity-container">
          <div className="image-container img-one">
            <img src={FourP} alt="tennis" />
            <div className="overlay">
              <h3>Technology</h3>
            </div>
          </div>

          <div className="image-container img-two">
            <img src={TwoP} alt="hiking" />
            <div className="overlay">
              <h3>Data science</h3>
            </div>
          </div>

          <div className="image-container img-three">
            <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c8e88356-8df5-4ac5-9e1f-5b9e99685021" alt="running" />
            <div className="overlay">
              <h3>Enviromental</h3>
            </div>
          </div>

          <div className="image-container img-four">
            <img src={ThreeP} alt="cycling" />
            <div className="overlay">
              <h3>Engnering</h3>
            </div>
          </div>

          <div className="image-container img-five">
            <img src={FiveP} alt="yoga" />
            <div className="overlay">
              <h3>Fintech</h3>
            </div>
          </div>

          <div className="image-container img-six">
            <img src={OneP} alt="swimming" />
            <div className="overlay">
              <h3>Water acess</h3>
            </div>
          </div>
        </div>
      </div>}

      <div className="left-bottom">
    <div style={{marginTop:"20px"}} className="weekly-schedule">
      <h1>Active projects</h1>
      
      <div  className="calendar">
      


{projects && projects.map((project, index) => {
  // Extract month and year from the created date
  const dateParts = project.created.split(": ");
  const month = new Date(dateParts[1]).getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const year = dateParts[2];

  // Create a new object with additional properties for month and year
  const modifiedProject = {
    ...project,
    month: month,
    year: year
  };

  const handleDetailsClick = (projectId) => {
    
    localStorage.setItem('projectId', projectId);
    window.location.href="/details"
  };

  return (
    <div key={index} className={`day-and-activity activity-${activityClasses[index % activityClasses.length]}`}>
      <div className="day">
        <h1>{modifiedProject.month}</h1>
        <p>{modifiedProject.year}</p>
      </div>
      <div className="activity">
        <h2>{modifiedProject.name}</h2>
        <div className="participants">
          {/* Render participants */}
          <img src={`https://browse-index.com/server/${modifiedProject.profile_pic}`} alt="" />
        </div>
      </div>

      <button className="btn" onClick={() => handleDetailsClick(modifiedProject.id)}>Details</button>
    
    </div>
  );
})}
      </div>
    </div>

        <div className="personal-bests">
          <h1>Personal Bests</h1>
          <div className="personal-bests-container">
            {/* Insert your personal bests content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;