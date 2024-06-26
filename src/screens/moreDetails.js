import React, { useEffect, useState } from "react";
import axios from "axios";
import LocationIcon from "../assets/img/location.svg"


const MoreOnlineDetails = () => {
  const [projectName, setProjectName] = useState();
  const [Role, setRole] = useState();
  const [StudentN, setStudentN] = useState();
  const [timeFrame, setTimeFrame] = useState();
  const [statusText, SetstatusText] = useState();
  const [projectPic, setProjectPic] = useState();
  const [projectAbout, setProjectAbout] = useState();
  const [projectShort, setProjecShort] = useState();
  const [projectTags, setProjectTags] = useState([]);
  const [projectSkillz, setProjectSkillz] = useState([]);
  const [imagez, setImages] = useState([]);
  const [partnerz, setPartnerz] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/getProjects.php");
        const projectData = response.data.find(item => item.id === projectId);
        setProjectName(projectData.title);
        setProjectAbout(projectData.about);
        setProjectPic(projectData.dp);
        setProjecShort(projectData.bio);
        setProjectSkillz(projectData.skills);
       
        setImages(projectData.images);
        setProjectTags(projectData.category);
       
        setTimeFrame(projectData.time);
        setStudentN(projectData.studentsN);
        SetstatusText(projectData.statusText);
        setPartnerz(projectData.logos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
  <body className="body">
    <div className="app-container-jv">
      <div className="main-area">
        <section className="content-section">
          <h1 className="section-header">{projectName}</h1>
          <div className="flex gap-3 flex-wrap mt-4">
            {projectTags && projectTags.map((tag, index) => {
  // Define text color based on the index or any other logic
  const textColors = ['text-yellow-800', 'text-green-800', 'text-blue-800', 'text-indigo-800'];
  
  const bgColors = ['bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-indigo-100'];
  return (
     <span
          key={index}
          className={`rounded-sm ${bgColors[index % bgColors.length]} px-3 py-1 text-xs font-medium ${textColors[index % textColors.length]}`}
        >
          {tag}
        </span>
  );
})}
          </div>
          <div className="flex pd gap-2 mt-4">
            <a href="https://outlook.office.com/bookwithme/user/76c26b47e77a46718124e251901996d9@aseiug.org?anonymous&ep=plink">
              <button
                type="button"
                className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Schedule call
              </button>
            </a>
            <button
              onClick={() => window.location.href = './login'}
              type="button"
              className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isBooking ? "Booking..." : "Book project"}
            </button>
          </div>
        </section>
        <section className="content-section">
          <div className="section-header-wrapper">
            <h1 className="section-header">Preview</h1>
          </div>
          <div className="content-section-line">
            <div className="section-part left">
              <a className="image-wrapper">
                <div className="image-overlay">
                  <div className="video-info">
                    <div className="video-info-text">
                      <p className="project-name medium">{projectName}</p>
                    </div>
                    
                  </div>
                </div>
                <img className="imgzi" src={`https://browse-index.com/server/${projectPic}`} alt="Project" />
                <span className="video-time">{/* time goes here*/}</span>
              </a>
            </div>
            <div className="section-part right">
              <div className="content-part-line">
                {imagez.slice(0, 2).map((image, index) => (
                  <a key={index} className="image-wrapper">
                    <div className="image-overlay">
                      <div className="video-info">
                        <div className="video-info-text">
                          <p className="project-name medium">
                            {/* time goes here*/}
                          </p>
                        </div>
                      </div>
                    </div>
                    <img src={`https://browse-index.com/server/${image}`} alt="Video" />
                    <span className="video-time">{/* time goes here*/}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="section-header-wrapper">
            <h1 className="section-header">Overview</h1>
          </div>
          <div className="files-table">
            <h2 className="text-md pd font-medium mt-20 leading-3">About</h2>
            <p className="text-sm pd text-stone-500 mt-2">{projectAbout}</p>
            <h2 className="text-md pd font-medium mt-20 leading-3">Your role</h2>
            <p className="text-sm pd text-stone-500 mt-2">{projectShort}</p>
            <h2 className="text-md pd font-medium mt-20 leading-3">Highlights</h2>
            <div className="pd">
              <p className="text-sm text-stone-500 mt-2"><b>Time frame:</b> {timeFrame} weeks</p>
              <p className="text-sm text-stone-500 mt-2"><b>Students number:</b> {StudentN}</p>
              <p className="text-sm text-stone-500 mt-2"><b>Status:</b> {statusText}</p>
            </div>
          </div>
          <div className="right-areas">
            <button className="btn-close-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-x-circle" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M15 9l-6 6M9 9l6 6"/>
              </svg>
            </button>
            <div className="right-area-header-wrapper">
              <p className="right-area-header pd">Skills</p>
              <button className="more-action"></button>
            </div>
            <div className="download-item-line">
              <div className="tag-scrollers">
                <div className="tag-scroller">
                  <ul className="tag-list">
                    {projectSkillz && projectSkillz.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="right-area-header-wrapper">
            <p className="right-area-header">Partners</p>
          </div>
          <div className="received-item-line">
            <div className="progress-line"></div>
            <div className="received-items-content">
              <div className="received-files">
                {partnerz.length === 1 ? (
                  <div className="image-wrapper">
                    <img src={`https://browse-index.com/server/${partnerz[0]}`} alt="logo-0" />
                    <br/><br/>
                    <div className="received-files-info">
                      This project is open to education partners
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex' }}>
                    {partnerz.map((logo, idx) => (
                      <div className="image-wrapper" key={idx}>
                        <img src={`https://browse-index.com/server/${logo}`} alt={`logo-${idx}`} />
                        <p></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="logox-section">
                <img className="logox" src={LocationIcon} alt="Location Icon" /> Uganda
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </body>
);
};

export default MoreOnlineDetails;