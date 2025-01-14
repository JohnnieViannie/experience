import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageOffSlider from "../components/dash/offline";
import FiveP from "../assets/img/projects/t5.jpg";
import { data } from '../components/data/ProjectData'; 
const MoreDetails = () => {
  
  const [projectName, setProjectName] = useState();
  
  const [projectPic, setProjectPic] = useState();
  const [projectAbout, setProjectAbout] = useState();
  const [projectShort, setProjecShort] = useState();
  const [projectRole, setProjectRole] = useState();
  const [projectTags, setProjectTags] = useState([]);
  const [projectSkillz, setProjectSkillz] = useState([]);
    const [imagez, setImages] = useState([]);
    const [isBooking, setIsBooking] = useState(false);

   

  useEffect(() => {
    // Get the URLSearchParams object
    const params = new URLSearchParams(window.location.search);
    // Get the value of the 'project' parameter
    const projectId = params.get('project');
    const projectData = data.find(item => item.id === projectId);
    setProjectName(projectData.title);
    setProjectAbout(projectData.excerpt);
    setProjectPic(projectData.image);
    setProjectSkillz(projectData.skills);
    setImages(projectData.logos);
    setProjectTags(projectData.category);
     setProjectRole(projectData.role)
  }, []);


   return (
  <div class="app-container">
    <div class="main-area">
      <section class="content-section">
        <h1 class="section-header">Quick Access</h1>
      <div class="access-links">
        <div class="access-link-wrapper">
          <div class="access-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span class="access-text">Images</span>
        </div>
        <div class="access-link-wrapper">
          <div class="access-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-music">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>                   <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
          <span class="access-text">Music</span>
        </div>
        <div class="access-link-wrapper">
          <div class="access-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <span class="access-text">Video</span>
        </div>
        <div class="access-link-wrapper">
          <div class="access-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left">
              <line x1="17" y1="10" x2="3" y2="10"/>
              <line x1="21" y1="6" x2="3" y2="6"/>
              <line x1="21" y1="14" x2="3" y2="14"/>
              <line x1="17" y1="18" x2="3" y2="18"/>
            </svg>
          </div>
          <span class="access-text">Docs</span>
        </div>
        <div class="access-link-wrapper">
          <div class="access-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <span class="access-text">Apps</span>
        </div>
        <div class="access-link-wrapper">
          <div class="access-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down-circle">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="8 12 12 16 16 12"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
            </svg>
          </div>
          <span class="access-text">Download</span>
        </div>
      </div>
      </section>
      <section class="content-section">
        <div class="section-header-wrapper">
          <h1 class="section-header">Preview</h1>
        </div>
 <div class="content-section-line">
        <div class="section-part left">
          <a class="image-wrapper">
            <div class="image-overlay">
              <div class="video-info">
                <div class="video-info-text">
                  <p class="video-name medium">Happiness & Tears</p>
                  <p class="video-subtext medium">45.5 MB</p>
                </div>
                <button class="btn-play"></button>
            </div>
            </div>
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80"/>
            <span class="video-time">10:32</span>
          </a>
        </div>
        <div class="section-part right">
          <div class="content-part-line">
            <a class="image-wrapper">
              <div class="image-overlay">
              <div class="video-info">
              <div class="video-info-text">
                <p class="video-name tiny">High Hopes</p>
                <p class="video-subtext tiny">50 MB</p>
              </div>
            </div>
            </div>
            <img src="https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"/>
              <span class="video-time">02:35</span>
          </a>
            <a class="image-wrapper">
              <div class="image-overlay">
              <div class="video-info">
              <div class="video-info-text">
                <p class="video-name tiny">Imaginery you</p>
                <p class="video-subtext tiny">210.2 MB</p>
              </div>
            </div>
            </div>
              <img src="https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"/>
              <span class="video-time">04:15</span>
            </a>
          </div>
        </div>
      </div>
      </section>
      <section class="content-section">
        <div class="section-header-wrapper">
          <h1 class="section-header">Recent Files</h1>
        </div>
        <div class="files-table">
          {/* Add your recent files here */}
        </div>
        <div class="right-areas">
          <button class="btn-close-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-x-circle" viewBox="0 0 24 24">
              <defs/>
              <circle cx="12" cy="12" r="10"/>
              <path d="M15 9l-6 6M9 9l6 6"/>
            </svg>
          </button>
          <div class="right-area-header-wrapper">
            <p class="right-area-header">Skills</p>
            <button class="more-action"></button>
          </div>
          <div class="download-item-line">
            {/* Add your skills list here */}
          </div>
        </div>
        <div class="right-area-header-wrapper">
          <p class="right-area-header">Partners</p>
        </div>
        <div class="received-item-line">
          <div class="progress-line">
            <span class="time start">15:30</span>
            <span class="time end">18:30</span>
          </div>
          <div class="received-items-content">
            <div class="received-files">
        <div class="received-files">
          <div class="image-wrapper">
          <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"/>
        </div>
        <div class="image-wrapper">
          <img src="https://images.unsplash.com/photo-1498855926480-d98e83099315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"/>
        </div>
        <div class="image-wrapper">
          <img src="https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"/>
        </div>
        </div>
            </div>
            <div class="received-files-info">
              Received <span class="info-purple">This project is open to education partners</span> 
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

};

export default MoreDetails;
