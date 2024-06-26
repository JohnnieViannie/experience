import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";


function AddTags() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tagInput, settagInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    settagInput(""); // Reset tag input
  };

  const handletagInputChange = (event) => {
    settagInput(event.target.value);
  };

  const handleAddtag = () => {
    setIsAdding(true); // Set adding state to true while making the request
    axios
      .post("https://browse-index.com/server/addTag.php", { tag: tagInput, types:"tag" })
      .then((response) => {
        console.log("tag added:", tagInput);
        setIsAdding(false); 
        settagInput('')
      })
      .catch((error) => {
        console.error("Error adding tag:", error);
        setIsAdding(false); // Reset adding state if request fails
      });
  };

  return (
    <>
      <button className="save-button" onClick={handleOpenModal}>
        {isAdding ? "Adding..." : "Add tags"}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal" // Custom CSS class for modal
        overlayClassName="custom-overlay" // Custom CSS class for modal overlay
        contentLabel="Add tag Modal"
      >
        <div className="modal-content">
          <h2>Add tags</h2>
          <input
            type="text"
            value={tagInput}
            onChange={handletagInputChange}
            placeholder="Enter your tag"
          />
          <button onClick={handleAddtag} disabled={isAdding}>
            {isAdding ? "Adding..." : "Add tag"}
          </button>
          <button className="float" onClick={handleCloseModal}>Cancel</button>
        </div>
      </Modal>
    </>
  );
}

export default AddTags;