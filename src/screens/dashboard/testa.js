// Admin.js
import React, { useState, useEffect } from 'react';
import './test.css';
import axios from "axios";
import SideBar from "./component/sideBar";
import Slider from "react-slick";
import OneP from "../../assets/img/projects/t1.jpg";
import TwoP from "../../assets/img/projects/t2.jpg";
import ThreeP from "../../assets/img/projects/t3.jpg";
import FourP from "../../assets/img/projects/t4.jpg";
import FiveP from "../../assets/img/projects/t5.jpg";
import Image1 from "./img/book1.png";
import Image2 from "./img/book2.png";
import Image3 from "./img/book3.png";

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [namez, setNamez] = useState();
  const [isAdmin, setAdmin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const classNames = ["box-one", "box-two", "box-three"];
  const images = [Image1, Image2, Image3];

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/userProjects.php", {
          email: loginData.email
        });
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    setNamez(loginData.name);

    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/userProjects.php", {
          email: loginData.email
        });
        setMyProjects(response.data.book);

        if (response.data.user[0].user_type.trim() === 'admin') {
          setAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleVideoMouseOver = (event) => {
    const video = event.currentTarget.querySelector("video");
    video.play();
  };

  const handleVideoMouseLeave = (event) => {
    const video = event.currentTarget.querySelector("video");
    video.pause();
  };

  const handleDetailsClick = (projectId) => {
    localStorage.setItem('projectId', projectId);
    window.location.href = "/details";
  };

  return (
    <div className="containeri">
      <SideBar admin={isAdmin} />
      <div className="wrapper">
        <div className="header">
          <div className="user-settings">
            <div className="user-name">{namez}</div>
            <img className="user-img" src="https://browse-index.com/static/media/logow.eaf4413c.png" alt="" />
          </div>
        </div>
        <div className="main-container">
          <div className="left-contenti">
            <div className="activities">
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
                    <h3>Environmental</h3>
                  </div>
                </div>
                <div className="image-container img-four">
                  <img src={ThreeP} alt="cycling" />
                  <div className="overlay">
                    <h3>Engineering</h3>
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
                    <h3>Water access</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main className="mainer">
            <div className="heada">
              <span>top projects</span>
              <h1>Our Popular projects</h1>
              <p>Choose from a variety of projects carefully designed to meet the requirements of your industry</p>
            </div>
            <div className="viannie">
              {projects && projects.map((project, index) => {
                const dateParts = project.created.split(": ");
                const month = new Date(dateParts[1]).getMonth() + 1;
                const year = dateParts[2];
                const modifiedProject = {
                  ...project,
                  month: month,
                  year: year
                };

                return (
                  <div className="item" key={project.id} onClick={() => handleDetailsClick(modifiedProject.id)}>
                    <img src={`https://browse-index.com/server/${modifiedProject.profile_pic}`} alt={modifiedProject.profile_pic} />
                    <div className="overlayzi">
                      <span>{modifiedProject.project_tag}</span>
                      <div>
                        <h2>{modifiedProject.name}</h2>
                        <p>{modifiedProject.created}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
                          <div className="mobile-personal-bests">
                <h1>My projects</h1>
                <div className="personal-bests-container">
{myProjects && myProjects.length > 0 ? (
  myProjects.map((item, index) => (
    <div key={index} className={`best-item ${classNames[currentIndex]}`}>
      <p>{item.name}</p>
      <img src={images[index % images.length]} alt="" />
    </div>
  ))
) : (
  <div className="no-projects-message">You have no projects.</div>
)}
                </div>
              </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;