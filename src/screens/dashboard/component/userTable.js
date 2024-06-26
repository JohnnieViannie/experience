import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [visibleCount, setVisibleCount] = useState(5); // Add visibleCount state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://browse-index.com/server/data.php");
        setUsers(response.data.users);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const toggleActive = async (userId) => {
    try {
      // Find the user by user ID
      const userToUpdate = users.find(user => user.user_id === userId);

      // Toggle the status
      const newStatus = userToUpdate.status === "1" ? "0" : "1";

      // Update the user object with the new status
      const updatedUser = { ...userToUpdate, status: newStatus };
      // Update the users state with the updated user
      setUsers(prevUsers => prevUsers.map(user => (user.user_id === userId ? updatedUser : user)));
      // Make a POST request to update the user status in the database
      await axios.post("https://browse-index.com/server/updateStatus.php", {
        userId: userId,
        status: newStatus
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
          setUsers(prevUsers => prevUsers.filter(user => user.user_id !== userId));
    try {
      // Make a POST request to delete the user from the database
      await axios.post("https://browse-index.com/server/deleteUser.php", {
        userId: userId
      });

      // Update the users state to remove the deleted user

    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Users</h2>
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
                <th>Email</th>
                <th>Phone number</th>
                <th>Interest</th>
                <th>Created</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : (
                users && users.slice(0, visibleCount).map((item, index) => (
                  <tr key={index}>
                    <td className="break-word">{item.username}</td>
                    <td className="break-word">{item.email}</td>
                    <td className="break-word">{item.phone_number}</td>
                    <td className="break-word">{item.Interest}</td>
                    <td className="break-word">{item.created_at}</td>
                    <td>
                      <button className="save-button" onClick={() => toggleActive(item.user_id)}>
                        {item.status === "1" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                    <td>
                      <button className="save-button" onClick={() => deleteUser(item.user_id)}>
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
      {visibleCount < users.length && (
        <button className="see-more-button" onClick={handleSeeMore}>
          See More
        </button>
      )}
    </section>
  );
};

export default UserTable;
