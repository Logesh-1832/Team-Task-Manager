import React, { SetStateAction, useEffect, useState } from 'react';
import { GlobalContants } from '../../global/constants';
import Popup from '../Modules/Components/popup';
import './project.css'
function Project() {
  const [projects, setProjects] = useState([]);
  const [isEdit, setPost] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active'); 
  const [isPopupOpen, setIsPopupOpen] = useState(false)
 // const [isEditpop, isEditPopup] = useState(false)

  const [editID, setProjectId] = useState('')

  //const url = GlobalContants.BaseURL + 'users'; 

  const isEditpop = (id: SetStateAction<string>)=> {
    setProjectId(id);
    setIsPopupOpen(true)
    post()
  }
  const closePopup = ()=> setIsPopupOpen(false)
  const post = ()=> setPost(true)

  const openPopup = ()=> setIsPopupOpen(true)
  //Get projects
  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  //Post project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectID = editID;
    const newProject = { name, description, status };
    try {
      const response = await fetch( isEdit ?  `http://localhost:3000/project/${projectID}` : 'http://localhost:3000/project', {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Project added successfully!');
        // Optionally reset the form
        setName('');
        setDescription('');
        setStatus('active');
      } else {
        alert(data.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };


  // useEffect(() => {
  //   fetch('http://localhost:3000/user')
  //     .then(response => response.json())
  //     .then(data => setCustomers(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  // useEffect(() => {
  //   fetch('http://localhost:3000/users')
  //     .then(response => response.json())
  //     .then(data => setCustomers(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <>
      <h1>Projects</h1> <button type="submit" onClick={openPopup}>Add User</button>

      {isPopupOpen && (
        <Popup>   
        <div>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <button type="submit">Add User</button>
        <button className="close-btn" onClick={closePopup}>Close</button>
      </form>       
        </div>
      </Popup>
      )}

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.status}</td>
            <td>{project.createdat}</td>
            <td onClick={() => isEditpop(project.id)}>Edit</td>
            <td>Delete</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default Project;
