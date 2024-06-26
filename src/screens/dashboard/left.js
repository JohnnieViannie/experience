import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Image1 from "./img/book1.png";
import Image2 from "./img/book2.png";
import Image3 from "./img/book3.png";

const LeftContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [myProjects, setMyprojects] = useState([]);
  const [namez, setNamez] = useState();
  const [isAdmin, setAdmin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State variable for current index
  const images = [Image1, Image2, Image3]; // Array of image sources
  const classNames = ["box-one", "box-two", "box-three"]; // Array of class names

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    setNamez(loginData.name);

    const fetchData = async () => {
      try {
        const response = await axios.post("https://ni-experiences.com/server/userProjects.php", {
          email: loginData.email
        });

        setMyprojects(response.data.book);
        

  if(response.data.user[0].user_type.trim() === 'admin') {
    setAdmin(true);
  } 
 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const getNextIndex = () => {
    return (currentIndex + 1) % classNames.length;
  };

  useEffect(() => {
    setCurrentIndex(getNextIndex());
  }, [myProjects]); // Update index when myProjects changes

  return (
    <div className="right-content">
      <div className="user-info">
        <div className="icon-container" onClick={toggleDropdown}>
          <i className="fa fa-user nav-icon"></i>
          {isOpen && (
            <div className="dropdown-content">
              <a href="#">Settings</a>
              {isAdmin && (<Link to="/admin">Admin</Link>)}
              <Link to="/contact">
                <a href="#">Help center</a>
              </Link>
              {/* Add more dropdown items as needed */}
            </div>
          )}
        </div>
        <h4>{namez}</h4>
        <img src="https://ni-experiences.com/static/media/logow.eaf4413c.png" alt="user" />
      </div>

      <div className="active-calories">
        <h1 style={{ alignSelf: "flex-start" }}>overview</h1>
        <div className="active-calories-container">
          <div className="box" style={{ "--i": "85%" }}></div>
          <div className="calories-content">
            <p><span>My projects:</span> 40</p>
            <p><span>completed:</span> 30</p>
            <p><span>ongoing:</span> 10</p>
          </div>
        </div>
      </div>

      <div className="mobile-personal-bests">
        <h1>My projects</h1>
        <div className="personal-bests-container">
          {myProjects && myProjects.map((item, index) => (
            <div key={index} className={`best-item ${classNames[currentIndex]}`}>
              <p>{item.name}</p>
              <img src={images[index % images.length]} alt="" /> {/* Use dynamic image source with cycling */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftContent;