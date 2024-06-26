import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/requests.php");
        
        setUsers(response.data.projects);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleAccept = async (projectId, userId) => {
    try {
      // Update status to "accepted"
      const updatedUsers = users.map((user) =>
        user.project_id === projectId ? { ...user, status: "accepted" } : user
      );
      setUsers(updatedUsers);

      // Make a POST request with project_id and user_id
      const response = await axios.post("https://browse-index.com/server/booking.php", {
        project_id: projectId,
        user_id: userId
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (projectId) => 
  {
    
          setUsers(prevUsers => prevUsers.filter(user => user.project_id !== projectId));
    
    try {
      await axios.post("https://browse-index.com/server/deleteRequest.php", {
        project_id: projectId
      });

      // Remove the deleted user from the state

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Booking requests</h2>
        <div className="filter-options">
          <button className="button">
            <i className="ph-plus"></i>
          </button>
        </div>
      </div>
      <div className="table-container-scrollable">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Project</th>
                <th>Created</th>
                <th>Contact</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : (
                users &&
                users.map((item, index) => (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.created_at}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.status !== "accepted" && ( // Check if status is not already accepted
                        <button
                          className="save-button"
                          onClick={() => handleAccept(item.project_id, item.user_id)}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleDelete(item.project_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Booking;
