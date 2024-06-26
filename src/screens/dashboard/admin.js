import React, { useState, useEffect } from 'react';
import axios from "axios";
import UserTable from "./component/userTable";
import ProjectTable from "./component/projectTable";
import AddSkillz from "./component/AddSkillz";
import AddTags from "./component/addTags";
import Booking from "./component/booking"
import "../../style/admin.css"



const Admin = () => {
  
  
   const[Finished, setFinished] = useState("0");
  const[book, setBook] = useState("0");
  const[userz, setUserz] = useState("0");
  const[projects, setProjects] = useState("0");
  const[OngoingProjects, setOnProjects] = useState("0");
  const[Requests, setRequests] = useState();
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/data.php");

       
const numberOfUsers = response.data.users.length;
const numberOfprojects = response.data.projects.length;
setUserz(numberOfUsers);
setProjects(numberOfprojects);

const ongoingProjects = response.data.projects.filter(project => project.status === "1").length;
setOnProjects(ongoingProjects)


const bookedProjects = response.data.projects.filter(project => project.booked === "0").length;
setBook(bookedProjects)

const finishedProjects = response.data.projects.filter(project => project.status === "2").length;
setFinished(finishedProjects)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <>
<div class="containr">

	<div class="app">
		<div class="app-body-navigation">
		</div>
		<div class="app-body-main-content">
			<section class="service-section">
				<h2>Admin</h2>

				<div class="tiles">
					<article class="tile">
						<div class="tile-header">
							<i class="ph-lightning-light"></i>
							<h3>
								<span>Users</span>
								<span>{userz}</span>
							</h3>
						</div>

					</article>
					<article class="tile">
						<div class="tile-header">
							<i class="ph-fire-simple-light"></i>
							<h3>
								<span>All projects</span>
								<span>{projects}</span>
							</h3>
						</div>
						<a href="#">
					
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>
					<article class="tile">
						<div class="tile-header">
							<i class="ph-file-light"></i>
							<h3>
								<span>Booked projects</span>
								<span>{book}</span>
							</h3>
						</div>
						<a href="#">
							
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>

										<article class="tile">
						<div class="tile-header">
							<i class="ph-file-light"></i>
							<h3>
								<span>Ongoing projects</span>
								<span>{OngoingProjects}</span>
							</h3>
						</div>
						<a href="#">
							
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>
										<article class="tile">
						<div class="tile-header">
							<i class="ph-file-light"></i>
							<h3>
								<span>Finished projects</span>
								<span>{Finished}</span>
							</h3>
						</div>
						<a href="#">
						
							<span class="icon-button">
								<i class="ph-caret-right-bold"></i>
							</span>
						</a>
					</article>
										<article class="tile">
								
<AddTags/>

					</article>
										<article class="tile">
				

						
								
<AddSkillz/>
							
						

					</article>
				</div>

			</section>

<UserTable/>
<ProjectTable/>
<Booking/>
		</div>

	</div>
</div>
</>
)
}
export default Admin