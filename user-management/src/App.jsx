import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import Pagination from './components/Pagination';
import AddNewButton from './components/AddNewButton';



const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    account: 'active'
  });
  
const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        account: 'active'
      });
      setIsAddingNew(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleSave = async () => {
    if (selectedUser) {
      try {
        const response = await axios.put(`${apiUrl}/users/${selectedUser._id}`, selectedUser);
        const updatedUsers = users.map(user => 
          user._id === selectedUser._id ? response.data : user
        );
        setUsers(updatedUsers);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`${apiUrl}/users/${selectedUser._id}`);
        const updatedUsers = users.filter(user => user._id !== selectedUser._id);
        setUsers(updatedUsers);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAddingNew) {
      setNewUser({ ...newUser, [name]: value });
    } else {
      setSelectedUser({ ...selectedUser, [name]: value });
    }
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setIsAddingNew(false);
    setNewUser({
      name: '',
      lastname: '',
      phone: '',
      email: '',
      account: 'active'
    });
  };

  const handlePageSizeChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleAddNew = () => {
    setIsAddingNew(!isAddingNew);
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <AddNewButton className="bg-green-500 mb-4" isAddingNew={isAddingNew} toggleAddNew={toggleAddNew} buttonText={isAddingNew ? 'Cancel Add' : 'Add New User'} />
      <UserTable users={currentUsers} onEditClick={setSelectedUser} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.ceil(users.length / usersPerPage)} 
        onPageClick={handlePageClick} 
        usersPerPage={usersPerPage} 
        onPageSizeChange={handlePageSizeChange} 
      />
      {(selectedUser || isAddingNew) && (
        <UserForm 
          isAddingNew={isAddingNew} toggleAddNew={toggleAddNew}
          user={selectedUser}
          newUser={newUser}
          onChange={handleInputChange}
          onCancel={handleCancel}
          onSave={handleSave}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
