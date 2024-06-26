import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

export default function ScheduleCallButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    interests: [],
    phoneNumber: '',
    emailAddress: '',
    dateTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInterestsChange = (e) => {
    const { options } = e.target;
    const selectedInterests = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedInterests.push(options[i].value);
      }
    }
    setFormData(prevState => ({
      ...prevState,
      interests: selectedInterests
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('your-api-endpoint', formData);
      // Close modal and do any additional UI updates if needed
      setModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state or display error message to the user
    }
  };

  return (
    <div>
      <Wrapper className="animate pointer radius8" onClick={() => setModalOpen(true)}>
        Schedule Call
      </Wrapper>
      
      {modalOpen && (
        <ModalOverlay>
          <ModalContent>
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              
              <label>University Name:</label>
              <input type="text" name="university" value={formData.university} onChange={handleChange} required />
              
              <label>Interests:</label>
              <select multiple name="interests" value={formData.interests} onChange={handleInterestsChange}>
                <option value="Finance">Finance</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                {/* Add more options as needed */}
              </select>
              
              <label>Phone Number:</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              
              <label>Email Address:</label>
              <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
              
              <label>Date and Time:</label>
              <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />
              
              <button type="submit">Schedule</button>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#D0312D" : "#D0312D")};
  background-color: ${(props) => (props.border ? "transparent" : "#D0312D")};
  width: 100%;
  padding: 1px;
  outline: none;
  color: ${(props) => (props.border ? "#D0312D" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#D0312D")};
    color: ${(props) => (props.border ? "#D0312D" : "#fff")};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  position: relative;


span.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #888;
}
`;