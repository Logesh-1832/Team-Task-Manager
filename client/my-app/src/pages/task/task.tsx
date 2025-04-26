import React, { SetStateAction, useEffect, useState } from 'react';
import { GlobalContants } from '../../global/constants';
import Popup from '../components/popup';
import { useLocation  } from 'react-router-dom';
import './task.css'
import { getData, getDataByID, postData } from '../../services/api';
import Table from '../components/table';
import Form from '../components/form';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [taskByID, setTaskId] = useState({});
    const [id, setId] = useState("");
    const [isAddNewPopupOpen, setIsAddNewPopupOpen] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);

    async function loadAllTasks() {
        try {
          const c = await getData(`tasks`);
          setTasks(c);
        } catch (error) {
          console.error('Error loading projects:', error);
        }
      }
      useEffect(() => {
        loadAllTasks();
    }, []);
    
    const handleAddClick = () => {
      setIsAddNew(true);
      setIsAddNewPopupOpen(true);
    };  

    async function loadAllProjects() {
        try {
          const b = await getData(`projects`);
          setProjects(b);
        } catch (error) {
          console.error('Error loading projects:', error);
        }
      }
      useEffect(() => {
        loadAllProjects();
    }, []);

    async function taskById(id:any) {
        try { 
          const a = await getDataByID(`projects/${id}`);
          setTaskId(a);
        } catch (error) {
          console.error('Error loading projects:', error);
        }
      }

      useEffect(() => {
        if(id !== "All")
        taskById(id);
    }, [id]);

    const  handlePopupSubmit = async (data: any) => {
      try {
        await postData('task', data);
        taskById(id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    return (
        <>
            <div className="flex justify-end items-center gap-4 mb-4">
            <div className="w-48">
                <label className="block text-gray-700 font-medium mb-1">Status</label>
                <select
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    >
                    <option value="All">All</option>
                    {projects.map((project, index) => (
                    <option key={index} value={project.id}>{project.name}</option>
                    ))}            
                </select>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={handleAddClick}>
                Add
            </button>
            </div>

            { id === "" || id === "All" ? (
              <Table tasks={tasks} page= "Task" projectNames = {projects}/>
            ) : (
              <Table tasks={taskByID?.tasks || []}  page= "Task" projectNames = {projects}/>
            )}
           {isAddNewPopupOpen && isAddNew && (
            <Popup closePopup={function () { setIsAddNewPopupOpen(false); }}>
              <Form
              onSubmit={handlePopupSubmit}
            closePopup={function () { setIsAddNewPopupOpen(false); }} page= "Task" projectNames = {projects}
              />
            </Popup>
            )}
        </>
    );
}

export default Task;


