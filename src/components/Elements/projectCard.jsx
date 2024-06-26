import React from 'react';
import LocationIcon from "../../assets/img/location.svg";

const ProjectCard = ({ project, index }) => {
  const { dp, title, bio, skills, category, status, logos, id } = project;
  const number = index + 1;

  return (
    <div className="cardy">
      <div style={{ backgroundImage: `url(https://browse-index.com/server/${dp})` }} className="img-container">
        <div className="overlayy">
          Project {number}
        </div>
      </div>
      <div className="card-content">
        <br />
        <h2>{title}</h2>
        <p className="excerpt">{bio}</p>
        <div className="author"></div>
        <div className="listBtnDropdown">
          <div className="btnDropdown first">
            <button className="btnNav">Status<span className="chevron">▼</span></button>
            <div className="dropdown">
              <div className="dropdown-contenty">
                <ul>
                  <li>On going</li>
                  <li>Accepting bookings</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btnDropdown two">
            <button className="btnNav">Category<span className="chevron">▼</span></button>
            <div className="dropdown">
              <div className="dropdown-contenty">
                <ul>
                  {category.map((cat, idx) => (
                    <li key={idx}>{cat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="btnDropdown three">
            <button className="btnNav">Skills<span className="chevron">▼</span></button>
            <div className="dropdown">
              <div className="dropdown-contenty">
                <ul>

                                    {skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="logo-slider">
          <div className="logos-slide">
            {logos && logos.some(logo => logo !== "") ?
              logos.map((logo, idx) => (
                logo !== "" && <img key={idx} src={`https://browse-index.com/server/${logo}`} alt={`logo-${idx}`} />
              )) :
              <p>No logos</p>
            }
          </div>
          <div className="logox-container">
            <div className="logox-section floater">
              <img className="logox" src={LocationIcon} alt="logo-0" />
              Uganda
            </div>
            <div className="cmo">
              <a href={`/more_Onlinedetails?project=${id}`}>Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;