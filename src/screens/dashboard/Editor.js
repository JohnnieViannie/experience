import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./component/sideBar";
import LocationIcon from "../../assets/img/location.svg";
import Pencil from "../../assets/img/pen.svg";
const Editor = () => {
  
  const [showEditAboutModal, setShowEditAboutModal] = useState(false);
  const [showEditPartnerModal, setShowEditPartnerModal] = useState(false);
  const [showEditProjectImages, setShowEditProjectImages] = useState(false);
const [partnerImages, setPartnerImages] = useState([]);
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showEditPictureModal,setShowEditPictureModal] = useState(false)
  const [ID, setID] = useState();
  const [showEditHighlightsModal, setShowEditHighlightsModal] = useState(false);
  const [showSkillz, setShowEditSkill]= useState(false);
    const [showTag, setShowEditTag]= useState(false);
  const [projectName, setProjectName] = useState();
  const [projectPic, setProjectPic] = useState();
  const [projectAbout, setProjectAbout] = useState();
  const [projectShort, setProjecShort] = useState();
  const [StudentN, setStudentN] = useState();
  const [timeFrame, setTimeFrame] = useState();
  const [statusText, SetstatusText] = useState();
  const [projectTags, setProjectTags] = useState([]);
  const [projectSkillz, setProjectSkillz] = useState([]);
  const [imagez, setImages] = useState([]);
  const [Partnerz, setPartner] = useState([]);
  const [SkillData, setSkills] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pricingPlan, setPricingPlan] = useState("");
  const [numStudents, setNumStudents] = useState("");
const [currentStep, setCurrentStep] = useState(1);
    const [TagsData, setTags] = useState([]);
const [processing, setProcessing] = useState(false);

 const [showEditImageModal, setShowEditImageModal] = useState(false);

  const [processingDelete, setProcessingDelete] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);
useEffect(() => {
        const fetchDataz = async () => {
            try {
                const response = await axios.post("https://browse-index.com/server/getTags.php");
                setTags(response.data.data);
                setSkills(response.data.skills);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataz(); // Call the fetchData function when the component mounts
    }, []);
    
  useEffect(() => {
    const projectId = localStorage.getItem("projectId");

setID(projectId);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://browse-index.com/server/details.php",
          {
            projectid: projectId,
          }
        );
        const via = response.data;
        const proj = via.project;

        setProjectName(proj.name);
        setProjecShort(proj.bio);
        setProjectPic(proj.profile_pic);
       
        setProjectTags(via.tags);
        setProjectAbout(proj.about);
        setImages(via.images);
        console.log(via.images);
        setProjectSkillz(via.skillz);
        setTimeFrame(proj.time_frame);
        setStudentN(proj.students_number);
        SetstatusText(proj.status_text);
        setPartner(via.partner);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
        const fetchDataz = async () => {
            try {
                const response = await axios.post("https://browse-index.com/server/getTags.php");
                setTags(response.data.data);
                setSkills(response.data.skills);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataz(); // Call the fetchData function when the component mounts
    }, []);
const handleTitle = async (event) => {
  event.preventDefault();
  setProcessing(true);
 
  try {
    const response = await axios.post("https://browse-index.com/server/titleEdit.php", {
      projectId: ID,
      projectName: projectName,
    });
    if (parseInt(response.data.code)===100){
      setProcessing(false)
      setShowEditTitle(false);
      
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
  const handleAbout = async (event) => {
  event.preventDefault();
  setProcessing(true);
 
  try {
    const response = await axios.post("https://browse-index.com/server/editAbout.php", {
      projectId: ID,
      about: projectAbout,
    });
    console.log(response);
    if (parseInt(response.data.code)===100){
      setProcessing(false)
      setShowEditAboutModal(false);
      
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const handleRole = async (event) => {
  event.preventDefault();
  setProcessing(true);
 
  try {
    const response = await axios.post("https://browse-index.com/server/editRole.php", {
      projectId: ID,
      role: projectShort,
    });
    console.log(response);
    if (parseInt(response.data.code)===100){
      setProcessing(false)
      setShowEditRoleModal(false);
      
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const handleHighlight = async (event) => {
  event.preventDefault();
  setProcessing(true);
 
  try {
    const response = await axios.post("https://browse-index.com/server/editHighlight.php", {
      projectId: ID,
      statusText: statusText,
      studentsNumber: StudentN,
      timeFrame: timeFrame,
    });
    
    if (parseInt(response.data.code)===100){
      setProcessing(false)
      setShowEditHighlightsModal(false);
      
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const handleSkillz = async (event) => {
  event.preventDefault();
  setProcessing(true);

  const selectedSkills = Array.from(event.target.skills.options)
    .filter(option => option.selected)
    .map(option => option.value);

  try {
    const response = await axios.post("https://browse-index.com/server/editSkill.php", {
      projectId: ID, // Ensure 'ID' is defined somewhere in your code
      skills: selectedSkills,
    });

    if (parseInt(response.data.code) === 100) {
      setProcessing(false);
      setShowEditSkill(false); // Ensure this function updates the correct state variable
    } else {
      console.error("Error:", response.data.message);
      setProcessing(false);
    }
  } catch (error) {
    console.error("Error:", error);
    setProcessing(false);
  }
};
const handleTag= async (event) => {
  event.preventDefault();
  setProcessing(true);

  const selectedSkills = Array.from(event.target.tags.options)
    .filter(option => option.selected)
    .map(option => option.value);

  try {
    const response = await axios.post("https://browse-index.com/server/editTag.php", {
      projectId: ID, // Ensure 'ID' is defined somewhere in your code
      skills: selectedSkills,
    });

    if (parseInt(response.data.code) === 100) {
      setProcessing(false);
      setShowEditSkill(false); // Ensure this function updates the correct state variable
    } else {
      console.error("Error:", response.data.message);
      setProcessing(false);
    }
  } catch (error) {
    console.error("Error:", error);
    setProcessing(false);
  }
};
const handlePartnerImagesChange = (event) => {
    setPartnerImages(Array.from(event.target.files));
};

const handleDeletePartner = async (imageId) => {
  
  setPartner((prevPartners) => prevPartners.filter((partner) => partner.id !== imageId));
        try {
          
            const response = await axios.post("https://browse-index.com/server/deletePartner.php", {
                projectId: ID, // Ensure 'ID' is defined in your component
                imageId: imageId,
            });

            if (response.data.code === 100) {
                // Remove the deleted partner image from the state
                
            } else {
                console.error("Error deleting partner image:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting partner image:", error);
        }
    };
    
  const handleDeleteImage = async (imageId) => {
  setProcessingDelete(true);
  setDeletingImageId(true)
 
  const updatedImages = imagez.filter((image) => image.id !== imageId);
      setImages(updatedImages);
  try {
    const response = await axios.post(
      "https://browse-index.com/server/deleteImage.php",
      {
        projectId: ID,
        imageId: imageId,
      }
    );
    
    if (parseInt(response.data.code) === 100) {
      setProcessingDelete(false);
      // Update the imagez state to remove the deleted image
      
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="containeri">
      <SideBar admin="true" />
      {showEditPartnerModal && (
    <div className="modal">
        <div className="modal-content">
            <h2>Edit Partners</h2>
            <form method="post" action="https://browse-index.com/server/editPartner.php" encType="multipart/form-data">
                <span style={{ color: 'black', fontWeight: '900px' }} onClick={() => setShowEditPartnerModal(false)}>X</span>
                                        <input type="hidden" value={ID} name="projectId" />
     <label htmlFor="partnerImages">Partner images:</label>
                        <input type="file" name="partnerImages[]" multiple />
                <button type="submit">
               Submit
                </button>
            </form>
        </div>
    </div>
)}
      {showEditProjectImages && (
    <div className="modal">
        <div className="modal-content">
            <h2>Edit Project</h2>
            <form method="post" action="https://browse-index.com/server/editImages.php" encType="multipart/form-data">
                <span style={{ color: 'black', fontWeight: '900px' }} onClick={() => setShowEditProjectImages(false)}>X</span>
                                        <input type="hidden" value={ID} name="projectId" />
     <label htmlFor="partnerImages">Project images:</label>
                      <input type="file" name="moreImages[]" multiple />
                <button type="submit">
               Submit
                </button>
            </form>
        </div>
    </div>
)}
      {showEditTitle && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project</h2>
      <form onSubmit={handleTitle}>
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditTitle(false)}>X</span>
        <label htmlFor="projectName">Project Name:</label>
        <input 
          type="text" 
          name="projectName" 
          defaultValue={projectName} 
          onChange={(e) => setProjectName(e.target.value)} // Add onChange prop here
          required 
        />
<button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Submit"}
              </button>
      </form>
    </div>
  </div>
)}
      {showEditAboutModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project</h2>
      <form onSubmit={handleAbout}>
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditAboutModal(false)}>X</span>
<label htmlFor="about">About:</label>
                        <textarea
                       onChange={(e) => setProjectAbout(e.target.value)}
                        defaultValue={projectAbout} name="about" required></textarea>
<button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Submit"}
              </button>
      </form>
    </div>
  </div>
)}
      {showEditRoleModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project</h2>
      <form onSubmit={handleRole}>
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditRoleModal(false)}>X</span>
<label htmlFor="about">About:</label>
                        <textarea
                       onChange={(e) => setProjecShort(e.target.value)}
                        defaultValue={projectShort} name="about" required></textarea>
<button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Submit"}
              </button>
      </form>
    </div>
  </div>
)}
      {showEditHighlightsModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project</h2>
      <form onSubmit={handleHighlight}>
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditHighlightsModal(false)}>X</span>
<label htmlFor="statusText">Status:</label>
                        <input type="text" defaultValue={statusText}
                        onChange={(e) => SetstatusText(e.target.value)}
                        name="statusText" required />
                        <label htmlFor="timeFrame">Number of students </label>                
                        <input type="number"
                        onChange={(e) => setStudentN(e.target.value)}
                        defaultValue={StudentN} name="studentNumber" required />
                        <label htmlFor="timeFrame">Time frame</label>                
                        <input defaultValue={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        type="number" name="timeFrame" required />
<button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Submit"}
              </button>
      </form>
    </div>
  </div>
)}
     {showTag && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project</h2>
      <form onSubmit={handleTag}>
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditTag(false)}>X</span>
                  <label htmlFor="tags">Tags:</label>
                        <select name="tags[]" multiple required>
                            {TagsData.map((tag) => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  </div>
)}
     {showSkillz && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project</h2>
      <form onSubmit={handleSkillz}>
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditSkill(false)}>X</span>
        <label htmlFor="skills">Skills:</label>
        <select name="skills" multiple required>
          {SkillData.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  </div>
)}
{showEditPictureModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Project Picture</h2>
            <form method="post" action="https://browse-index.com/server/editDp.php" encType="multipart/form-data">
        <span style={{color:'black',fontWeight:'900px'}} onClick={() => setShowEditPictureModal(false)}>X</span>
        <label htmlFor="newPicture">New display picture:</label>
        <input 
          type="file" 
          name="newPicture" 
          
          required 
        />
<input type="hidden" value={ID} name="projectId" />
        <button type="submit" disabled={processing}>
          {processing ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  </div>
)}
      <div className="wrapper">
        <div className="app-container-jv">
          <div className="main-area">
            <section className="content-section">
              <h1 className="section-header">{projectName} <i onClick={()=>setShowEditTitle(true)} class="fas fa-edit"></i>
              
              </h1>
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
          {tag.name}
        </span>
  );
})} <i onClick={()=>setShowEditTag(true)} class="fas fa-edit"></i>
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
                    <img
                      src={`https://browse-index.com/server/${projectPic}`}
                      alt="Project"
                    />
                    <span className="video-time"><i onClick ={()=> setShowEditPictureModal(true)} class="fas fa-edit"></i></span>
                  </a>
                </div>
                <div className="section-part right">
                  <div className="content-part-line">
{imagez.slice(0,2).map((image, index) => (
  <a key={index} className="image-wrapper">
    <div className="image-overlay">
      <div className="video-info">
        <div className="video-info-text">
          <p className="project-name medium">
            <i className="fas fa-trash" onClick={() => handleDeleteImage(image.id)}></i>
            {/* Show processing message while deleting */}
           {deletingImageId === image.id && <span>Deleting...</span>}
             
          </p>
        </div>
      </div>
    </div>
    <img
      src={`https://browse-index.com/server/${image.name}`}
      alt="Video"
    />
    <span className="video-time"> 
    
    
   <i onClick={() => {setShowEditProjectImages(true);
                    
                    
                  }} className="fas fa-edit"></i></span>
  </a>
))}
{imagez.length === 0 && (
 <span>Edit project images <i 
    onClick={() => setShowEditProjectImages(true)} 
    className="fas fa-edit"
  /></span>
)}
                  
                  </div>
                </div>
              </div>
            </section>
            <section className="content-section">
              <div className="section-header-wrapper">
                <h1 className="section-header">Overview</h1>
              </div>
              <div className="files-table">
                <h2 className="text-md pd font-medium mt-20 leading-3">About <i onClick={()=>setShowEditAboutModal(true)}
                class="fas fa-edit"></i></h2>
                <p className="text-sm pd text-stone-500 mt-2">{projectAbout} </p>
                <h2 className="text-md pd font-medium mt-20 leading-3">Your role <i onClick={()=>setShowEditRoleModal(true)} class="fas fa-edit"></i></h2>
                <p className="text-sm pd text-stone-500 mt-2">{projectShort}</p>
                <h2 className="text-md pd font-medium mt-20 leading-3">Highlights <i onClick={()=>setShowEditHighlightsModal(true)}  class="fas fa-edit"></i></h2>
                <div className="pd">
                  <p className="text-sm text-stone-500 mt-2">
                    <b>Time frame:</b> {timeFrame} weeks 
                  </p>
                  <p className="text-sm text-stone-500 mt-2">
                    <b>Students number:</b> {StudentN} 
                  </p>
                  <p className="text-sm text-stone-500 mt-2">
                    <b>Status:</b> {statusText} 
                  </p>
                </div>
              </div>
              <div className="right-areas">
                <button className="btn-close-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-x-circle"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </button>
                <div className="right-area-header-wrapper">
                  <p className="right-area-header pd">Skills <i  onClick={()=>setShowEditSkill(true)} class="fas fa-edit"></i></p>
                  <button className="more-action"></button>
                </div>
                <div className="download-item-line">
                  <div className="tag-scrollers">
                    <div className="tag-scroller">
                      <ul className="tag-list">
                        {projectSkillz &&
                          projectSkillz.map((item, index) => (
                            <li key={index}>{item.name}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
<div className="right-area-header-wrapper">
    <p className="right-area-header">Partners <i onClick={() => setShowEditPartnerModal(true)} className="fas fa-edit"></i></p>
</div>
              <div className="received-item-line">
                <div className="progress-line"></div>
                <div className="received-items-content">
                  <div className="received-files">
                    {Partnerz.length === 1 ? (
                      <div className="image-wrapper">
                        <img
                          src={`https://browse-index.com/server/${Partnerz[0].image}`}
                          alt="logo-0"
                        /> <i onClick={() => handleDeletePartner(Partnerz[0].id)}class="fas fa-trash"></i>
                        <br />
                        <br />
                        <div className="received-files-info">
                          This project is open to education partners
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex" }}>
                                                             {
                                        Partnerz.length === 1 ? (
                                            <div className="image-wrapper">
                                                <img
                                                    src={`https://browse-index.com/server/${Partnerz[0].image}`}
                                                    alt="logo-0"
                                                />
                                                <i className="fas fa-trash" onClick={() => {handleDeletePartner(Partnerz[0].id);
                                           
                                                }}></i>
                                                <br />
                                                <br />
                                                <div className="received-files-info">
                                                    This project is open to education partners
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ display: "flex" }}>
                                                {Partnerz.map((logo, idx) => (
                                                    <div className="image-wrapper" key={idx}>
                                                        <img
                                                            src={`https://browse-index.com/server/${logo.image}`}
                                                            alt={`logo-${idx}`}
                                                        />
                                                        <i className="fas fa-trash" onClick={() => handleDeletePartner(logo.id)}></i>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                      </div>
                    )}
                  </div>
                  <div className="logox-section">
                    <img
                      className="logox"
                      src={LocationIcon}
                      alt="Location Icon"
                    />{" "}
                    Uganda
                  </div>
                </div>
              </div>
            </section>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
