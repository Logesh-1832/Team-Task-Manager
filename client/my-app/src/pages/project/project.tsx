import React, { useState, useEffect } from 'react';
import { getData } from '../../services/api';

function Project() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectsData = await getData('projects');
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }

    loadProjects();
  }, []);

  return (
    <>
      <h1>Projects</h1>
      <button type="submit">Add User</button>
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
              <td onClick={() => console.log('Edit', project.id)}>Edit</td>
              <td onClick={() => console.log('Delete', project.id)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Project;
