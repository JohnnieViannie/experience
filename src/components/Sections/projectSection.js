import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import FullButton from "../Buttons/FullButton";
import location from "../../assets/img/location.svg"
import ProjectCard from "../Elements/projectCard"

function ProjectSection() {
  
  const [myprojects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/getProjects.php");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  // Display only the first three projects
  const displayedProjects = myprojects.slice(0, 3);

  return (
    <div className="conty">
      {displayedProjects && displayedProjects.map((item, index) => (
        <ProjectCard key={index} project={item} index={index} />
      ))}
      {/* "See More" button */}
      {myprojects.length > 3 && (
      <div className= "but">
                  <a href ="/projects">
                    <FullButton title="See more projects" border />
                    </a>
                    </div>
      )}
      
     

    </div>
  );
}

export default ProjectSection;