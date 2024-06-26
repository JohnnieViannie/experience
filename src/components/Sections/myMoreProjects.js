import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data/ProjectData'

import ProjectCard from "../Elements/projectCard"
import axios from "axios";
function MymoreProjects() {
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
  return (
    <div className="conty">

      
           {myprojects && myprojects.map((item, index) => (
        <ProjectCard key={index} project={item} index={index} />
      ))}
    </div>
  );
}

export default MymoreProjects;