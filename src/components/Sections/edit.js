import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./component/sideBar";
import LocationIcon from "../../assets/img/location.svg";
import Pencil from "../../assets/svg/Quotes"

const Editor = () => {
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
  const [editModal, setEditModal] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState({});
  const [currentEditValue, setCurrentEditValue] = useState("");

  

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
        SetstatusText(proj.status);
        setPartner(via.partners);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setCurrentEditItem(item);
    setCurrentEditValue(item.name); // Assuming 'name' is the editable field
    setEditModal(true);
  };

  const handleSaveEdit = () => {
    // Save the edited item here
    setEditModal(false);
  };

  const handleBooking = async () => {
    setIsBooking(true);

    const projectId = localStorage.getItem("projectId");
    const clientId = localStorage.getItem("clientId");

    try {
      await axios.post(
        "https://browse-index.com/server/book_project.php",
        {
          email: email,
          clientId: clientId,
          projectid: projectId,
          startDate: startDate,
          endDate: endDate,
          studentsNumber: numStudents,
          PricingPlan: pricingPlan,
        }
      );

      setIsBooking(false);
      setShowModal(true);
    } catch (error) {
      setIsBooking(false);
      console.error(error);
    }
  };

  return (
    <div className="max-h-screen overflow-y-auto overflow-x-hidden bg-gray-100 text-gray-800">
      <SideBar />
      <div className="pt-16 md:ml-64">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <img
              src={`https://browse-index.com/${projectPic}`}
              alt="Project Profile"
              className="mx-auto w-32 h-32 rounded-full border border-gray-300"
            />
            <div className="flex justify-center items-center">
              <h1 className="mt-4 text-center text-2xl font-bold text-gray-900">
                {projectName}
              </h1>
              <Pencil
                className="ml-2 cursor-pointer text-gray-600"
                onClick={() => handleEdit({ name: projectName })}
              />
            </div>
            <p className="mt-2 text-center text-lg text-gray-600">
              {projectShort}
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-10 p-5 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-xl font-bold">About the project</h2>
              <p>{projectAbout}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-xl font-bold">Tags</h2>
              <ul>
                {projectTags.map((tag) => (
                  <li key={tag.id} className="flex justify-between items-center">
                    {tag.name}
                    <Pencil
                      className="cursor-pointer text-gray-600"
                      onClick={() => handleEdit(tag)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-xl font-bold">Skills Required</h2>
              <ul>
                {projectSkillz.map((skill) => (
                  <li key={skill.id} className="flex justify-between items-center">
                    {skill.name}
                    <Pencil
                      className="cursor-pointer text-gray-600"
                      onClick={() => handleEdit(skill)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-xl font-bold">Images</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {imagez.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={`https://browse-index.com/${image.url}`}
                      alt="Project"
                      className="h-24 w-full rounded-md object-cover"
                    />
                    <Pencil
                      className="absolute top-1 right-1 cursor-pointer text-gray-600"
                      onClick={() => handleEdit(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-2 text-xl font-bold">Partners</h2>
              <ul>
                {Partnerz.map((partner) => (
                  <li key={partner.id} className="flex justify-between items-center">
                    {partner.name}
                    <Pencil
                      className="cursor-pointer text-gray-600"
                      onClick={() => handleEdit(partner)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold">Book This Project</h2>
            {renderStep()}
          </div>
        </div>
        {editModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Edit Item</h2>
              <input
                type="text"
                value={currentEditValue}
                onChange={(e) => setCurrentEditValue(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setEditModal(false)}
                  className="mr-2 rounded border border-gray-300 bg-gray-100 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded border border-gray-300 bg-blue-600 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Booking Confirmed</h2>
            <p>Your booking has been confirmed successfully!</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="rounded border border-gray-300 bg-blue-600 px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
