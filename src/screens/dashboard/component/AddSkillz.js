import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";


function AddSkillz() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSkillInput(""); // Reset skill input
  };

  const handleSkillInputChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleAddSkill = () => {
    setIsAdding(true); // Set adding state to true while making the request
    axios
      .post("https://browse-index.com/server/addSkill.php", { skill: skillInput, types:"skill" })
      .then((response) => {
        console.log("Skill added:", skillInput);
        setIsAdding(false); 
        setSkillInput('')
      })
      .catch((error) => {
        console.error("Error adding skill:", error);
        setIsAdding(false); // Reset adding state if request fails
      });
  };

  return (
    <>
      <button className="save-button" onClick={handleOpenModal}>
        {isAdding ? "Adding..." : "Add skills"}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal" // Custom CSS class for modal
        overlayClassName="custom-overlay" // Custom CSS class for modal overlay
        contentLabel="Add Skill Modal"
      >
        <div className="modal-content">
          <h2>Add Skills</h2>
          <input
            type="text"
            value={skillInput}
            onChange={handleSkillInputChange}
            placeholder="Enter your skill"
          />
          <button onClick={handleAddSkill} disabled={isAdding}>
            {isAdding ? "Adding..." : "Add Skill"}
          </button>
          <button className="float" onClick={handleCloseModal}>Cancel</button>
        </div>
      </Modal>
    </>
  );
}

export default AddSkillz;