import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./component/sideBar";
import LocationIcon from "../../assets/img/location.svg";
import { Link } from 'react-router-dom';
const Details = () => {
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
  const [isBooking, setIsBooking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pricingPlan, setPricingPlan] = useState("");
  const [numStudents, setNumStudents] = useState("");
const [currentStep, setCurrentStep] = useState(1);



const [errors, setErrors] = useState({});

const validateStepOne = () => {
  let tempErrors = {};
  if (!startDate) tempErrors.startDate = "Start Date is required";
  if (!endDate) tempErrors.endDate = "End Date is required";
  if (!numStudents) tempErrors.numStudents = "Number of Students is required";
  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0;
};

const nextStep = () => {
  if (currentStep === 1 && !validateStepOne()) {
    return;
  }
  setCurrentStep((prev) => prev + 1);
};

const prevStep = () => {
  setCurrentStep((prev) => prev - 1);
};

const renderStep = () => {
  switch (currentStep) {
    case 1:
      return (
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          {errors.endDate && <p className="error">{errors.endDate}</p>}
          <label>Number of Students:</label>
          <input
            type="number"
            value={numStudents}
            onChange={(e) => setNumStudents(e.target.value)}
            required
          />
          {errors.numStudents && <p className="error">{errors.numStudents}</p>}
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Next
          </button>
        </div>
      );
    case 2:
      return (
        <div>
          <span className="txt">Pricing Plan:</span>
          <div className="content-jvw">
            <div className="basic box-jvw">
              <h2 className="title-jvw">1</h2>
              <div className="view">
                <div className="icon-jvw">
                  <img src="https://i.postimg.cc/2jcfMcf4/hot-air-balloon.png" alt="hot-air-balloon" />
                </div>
                <div className="cost">
                  <p className="amount">Index economy</p>
                </div>
              </div>
              <div className="description">
                <ul>
                  <li>Per project pay.</li>
                  <li>Access resources.</li>
                  <li>Team size upto 5.</li>
                  <li>Brainstorm, design.</li>
                  <li>Share designs.</li>
                  <li>Get feedback.</li>
                </ul>
              </div>
              <div className="button-jv">
                <button onClick={() => PricingSetter("IndEx economy")}>CHOOSE PLAN</button>
              </div>
            </div>

            <div className="standard box-jvw">
              <h2 className="title-jvw">2</h2>
              <div className="view">
                <div className="icon-jvw">
                  <img src="https://i.postimg.cc/DzrTN72Z/airplane.png" alt="airplane" />
                </div>
                <div className="cost">
                  <p className="amount">Index plus</p>
                </div>
              </div>
              <div className="description">
                <ul>
                  <li>All Economy features.</li>
                  <li>Limited teams.</li>
                  <li>Industry engagement.</li>
                  <li>Student ratings.</li>
                  <li>Progress monitoring.</li>
                  <li>Present to industry.</li>
                </ul>
              </div>
              <div className="button-jv">
                <button onClick={() => PricingSetter("IndEx plus")}>CHOOSE PLAN</button>
              </div>
            </div>

            <div className="business box-jvw">
              <h2 className="title-jvw">3</h2>
              <div className="view">
                <div className="icon-jvw">
                  <img src="https://i.postimg.cc/wvFd6FRY/startup.png" alt="startup" />
                </div>
                <div className="cost">
                  <p className="amount">Index enterprise</p>
                </div>
              </div>
              <div className="description">
                <ul>
                  <li>All Plus features.</li>
                  <li>Custom teams.</li>
                  <li>Collaborate globally.</li>
                  <li>Free project choice.</li>
                  <li>On-ground support.</li>
                  <li>Custom experiences.</li>
                </ul>
              </div>
              <div className="button-jv">
                <button onClick={() => PricingSetter("IndEx enterprise")}>CHOOSE PLAN</button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-gray-700 px-3 py-2 text-sm font-medium text-white transition hover:border-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Previous
          </button>
        </div>
      );
    case 3:
      return (
        <div>
          <p>Email: {email}</p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
          <p>Number of Students: {numStudents}</p>
          <p>Pricing Plan: {pricingPlan}</p>
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-gray-700 px-3 py-2 text-sm font-medium text-white transition hover:border-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleBooking}
            className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isBooking ? "Booking..." : "Confirm"}
          </button>
        </div>
      );
    default:
      return null;
  }
};

  
  
  const PricingSetter =(plan) =>{
   
   setPricingPlan(plan);
   nextStep();
   
 }


  useEffect(() => {
    const projectId = localStorage.getItem("projectId");

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

  const handleBooking = async () => {
    try {
      setIsBooking(true);
      const projectId = localStorage.getItem("projectId");
      const loginData = JSON.parse(localStorage.getItem("loginData"));
      const response = await axios.post(
        "https://browse-index.com/server/book.php",
        {
          projectid: projectId,
          email: email || loginData.email,
          start_date: startDate,
          end_date: endDate,
          pricing_plan: pricingPlan,
          num_students: numStudents,
          name: projectName,
        }
      );
      console.log(response);
      alert("Booked successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error booking project:", error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="containeri">
      <SideBar admin="true" />
      <div className="wrapper">
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
          {tag.name}
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
                  onClick={() => setShowModal(true)}
                  type="button"
                  className="inline-flex w-auto cursor-pointer items-center justify-center rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Book project
                </button>
              </div>
            </section>
            {/* Modal */}
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                  <h2>Reservation Form</h2>
                  <form>
      {renderStep()}
      
                                <br></br>  <br></br>
                          <p> <Link to="/terms"><span style={{ color: "red", float:"left" }}>Terms of use</span></Link>   <Link to="/privacy-policy"><span style={{ color: "red", float:"right" }}>Privacy policy</span></Link></p>
    </form>
                </div>
              </div>
            )}
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
          className="imgzi"
          src={`https://browse-index.com/server/${projectPic}`}
          alt="Project"
        />
        <span className="video-time">{/* time goes here */}</span>
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
                    {/* time goes here */}
                  </p>
                </div>
              </div>
            </div>
            <img
              src={`https://browse-index.com/server/${image.name}`}
              alt="Video"
            />
            <span className="video-time">{/* time goes here */}</span>
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
                  <p className="right-area-header pd">Skills</p>
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
                <p className="right-area-header">Partners</p>
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
                        />
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
                            <p></p>
                          </div>
                        ))}
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

export default Details;
