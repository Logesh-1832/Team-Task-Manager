// components/TaskForm.js
import React, { useEffect, useState } from 'react';

function Form(props) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [projectid, setProjectid] = useState('');
  const [isPage, setIsTask] = useState(props.page);

  useEffect(() => {
    if (props.project) {
      setName(props.project.name || '');
      setTitle(props.project.title || '');
      setDescription(props.project.description || '');
      setStatus(props.project.status || '');
      setPriority(props.project.priority || '');
      setProjectid(props.project.projectid || '');

    }
  }, [props.project]); 
  
  function handleSubmit(e) {
    e.preventDefault();

const payload = props.page === "Project"
  ? { name, description, status }
  : { title, description, status, priority, projectid };
    props.onSubmit(payload);
    props.closePopup();
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

       {isPage === "Project" && (
        <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={function (e) { setName(e.target.value); }}
          placeholder="Enter name"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
       )} 


        {isPage === "Task" && (
        <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          value={title}
          onChange={function (e) { setTitle(e.target.value); }}
          placeholder="Enter name"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={function (e) { setDescription(e.target.value); }}
            placeholder="Enter description"
            rows={4}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isPage === "Project" && (
          <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={function (e) { setStatus(e.target.value); }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        )}

        
        {isPage === "Task" && (
          <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={function (e) { setStatus(e.target.value); }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="in_progress">in_progress</option>
            <option value="completed">Completed</option>
            <option value="not_started">not_started</option>
          </select>
        </div>
        )}

        {isPage === "Task" && (
          <div>
          <label className="block text-gray-700 font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={function (e) { setPriority(e.target.value); }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
        )}

        {isPage === "Task" && (
          <div>
          <label className="block text-gray-700 font-medium mb-1">Project</label>
          <select
            value={projectid}
            onChange={function (e) { setProjectid(e.target.value); }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {props.projectNames.map((project, index) => (
            <option key={index} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        )}

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={props.closePopup}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
