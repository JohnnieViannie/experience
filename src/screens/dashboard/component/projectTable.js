import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProjectTable = () => {
    const MAX_COUNT = 5;
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [TagsData, setTags] = useState([]);
    const [projectID, setProjectID] = useState()
    const [ListData, setList] = useState([]);
    const [SkillData, setSkills] = useState([]);
    const [shortBio, setBio] = useState();
    const [timeFrame, setTimeFrame] = useState();
    const [studentNumber, setStudentN] = useState();
    const [About, setAbout] = useState();
    const [statusText, SetstatusText] = useState();

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [deletingProjectId, setDeletingProjectId] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [moreImages, setMoreImages] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [Projects, setProjects] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://browse-index.com/server/data.php");
                setProjects(response.data.projects);
                setList(response.data.projects);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
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

    const toggleProjectStatus = async (projectId) => {
        try {
            // Find the project by id
            const projectToUpdate = ListData.find((project) => project.id === projectId);
            // Toggle the status
            const newStatus = projectToUpdate.status === 0 ? 1 : 0;
            // Update the project's status locally
            const updatedListData = ListData.map((project) =>
                project.id === projectId ? { ...project, status: newStatus } : project
            );
            setList(updatedListData);
            // Send a POST request to update the project's status in the backend
            await axios.post("https://browse-index.com/server/projectStatus.php", {
                projectId: projectId,
                newStatus: newStatus,
            });
        } catch (error) {
            console.error("Error updating project status:", error);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            setDeletingProjectId(projectId);
            // Send a POST request to delete the project
            const response = await axios.post("https://browse-index.com/server/delete.php", {
                projectId: projectId,
            });

            setDeletingProjectId(null);
            // Update the local project list after successful deletion
            if (response.data.success) {
                const updatedListData = ListData.filter((project) => project.id !== projectId);
                setList(updatedListData);
                setDeletingProjectId(null);
            } else {
                console.error("Failed to delete project:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            setDeletingProjectId(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Form validation
        const form = event.target;
        const formData = new FormData(form);
        const projectName = formData.get("projectName");
        const shortBio = formData.get("shortbio");

        const about = formData.get("about");
        const displayImage = formData.get("displayImage");
        const moreImages = formData.getAll("moreImages[]");
        const tags = formData.getAll("tags[]");
        const skills = formData.getAll("skills[]");

        // Check if required fields have data
        if (!projectName || !shortBio || !about || !displayImage || moreImages.length === 0 || tags.length === 0 || skills.length === 0) {
            alert("Please fill out all required fields.");
            return;
        }

        // Submit the form if all validations pass
        try {
            const response = await axios.post("https://browse-index.com/server/product.php", formData);

            setIsModalOpen(false); // Close the modal after successful submission
            // Update the list with the new project
            setList([...ListData, response.data.newProject]);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    return (
        <section className="transfer-section">
            <div className="transfer-section-header">
                <h2>Projects</h2>
                <div className="filter-options">
                    <button className="save-button" onClick={() => setIsModalOpen(true)}>
                        Add project
                    </button>
                </div>
            </div>
            <div className="table-container-scrollable">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Bio</th>
                                <th>Booked</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListData &&
                                ListData.slice(0, visibleCount).map((item, index) => (
                                    <tr key={index}>
                                        <td className="break-word">{item.name}</td>
                                        <td className="break-word">{item.bio}</td>
                                        <td>{item.booked === "1" ? "No" : "Yes"}</td>
                                        <td>
                                            <button
                                                className="save-button"
                                                onClick={() => toggleProjectStatus(item.id)}
                                            >
                                                {item.status === "0" ? "Activate" : "Deactivate"}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    localStorage.setItem("projectId", item.id);
                                                    window.location.href = "/editor";
                                                }}
                                                className="save-button"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                disabled={deletingProjectId === item.id}
                                                onClick={() => deleteProject(item.id)}
                                                className="save-button"
                                            >
                                                {deletingProjectId === item.id ? "Deleting..." : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {visibleCount < ListData.length && (
            <>
            <br></br>
                <button className="save-button" onClick={handleSeeMore}>
                    See More
                </button>
                </>
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Project</h2>
                        <form method="post" action="https://browse-index.com/server/product.php" encType="multipart/form-data">
                            <span className="close" onClick={() => setIsModalOpen(false)}>X</span>
                            <label htmlFor="projectName">Project Name:</label>
                            <input type="text" name="projectName" required />
                            <label htmlFor="shortBio">Short bio:</label>
                            <textarea type="text" name="shortbio" required></textarea>
                            <label htmlFor="statusText">Status:</label>
                            <input type="text" defaultValue={statusText} name="statusText" required />
                            <label htmlFor="timeFrame">Project time frame in weeks</label>
                            <input type="number" defaultValue={studentNumber} name="studentNumber" required />
                            <label htmlFor="timeFrame">Number of students</label>
                            <input defaultValue={timeFrame} type="number" name="timeFrame" required />
                            <div>
                                <label htmlFor="about">About:</label>
                                <textarea name="about" required></textarea>
                                <label htmlFor="displayImage">Project display image</label>
                                <input type="file" name="displayImage" required />
                            </div>
                            <label htmlFor="moreImages">More images:</label>
                            <input type="file" name="moreImages[]" multiple required />
                            <label htmlFor="partnerImages">Partner images:</label>
                            <input type="file" name="partnerImages[]" multiple required />
                            <label htmlFor="tags">Tags:</label>
                            <select name="tags[]" multiple required>
                                {TagsData.map((tag) => (
                                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                                ))}
                            </select>
                            <label htmlFor="skills">Skills:</label>
                            <select name="skills[]" multiple required>
                                {SkillData.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {isEditorOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Project</h2>
                        <form method="post" action="https://browse-index.com/server/projectUpdate.php" encType="multipart/form-data">
                            <span style={{color:'black',fontWeight:'900px'}} onClick={() => setIsEditorOpen(false)}>X</span>
                            <label htmlFor="projectName">Project Name:</label>
                            <input type="text" name="projectName" defaultValue={projectName} required />
                            <label htmlFor="shortBio">Short bio:</label>
                            <textarea type="text" defaultValue={shortBio} name="shortbio"></textarea>
                            <input type="hidden" value={projectID} name="projectId" />
                            <label htmlFor="about">About:</label>
                            <textarea defaultValue={About} name="about" required></textarea>
                            <label htmlFor="statusText">Status:</label>
                            <input type="text" defaultValue={statusText} name="statusText" required />
                            <label htmlFor="timeFrame">Project time frame in weeks</label>
                            <input defaultValue={studentNumber} type="number" name="studentsNumber" required />
                            <label htmlFor="timeFrame">Number of students</label>
                            <input defaultValue={timeFrame} type="number" name="timeFrame" required />
                            <div>
                                <label htmlFor="dp">Display image:</label>
                                <input type="file" name="displayImage" />
                            </div>
                            <label htmlFor="moreImages">More images:</label>
                            <input type="file" name="moreImages[]" multiple />
                            <label htmlFor="partnerImages">Partner images:</label>
                            <input type="file" name="partnerImages[]" multiple />
                            <label htmlFor="tags">Tags:</label>
                            <select name="tags[]" multiple required>
                                {TagsData.map((tag) => (
                                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                                ))}
                            </select>
                            <label htmlFor="skills">Skills:</label>
                            <select name="skills[]" multiple required>
                                {SkillData.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProjectTable;
