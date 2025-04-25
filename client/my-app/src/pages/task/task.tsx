import React, { SetStateAction, useEffect, useState } from 'react';
import { GlobalContants } from '../../global/constants';
import Popup from '../Modules/Components/popup';
import './task.css'

function Task() {
    const [tasks, setProjects] = useState([]);
    const [isEdit, setPost] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    // const [isEditpop, isEditPopup] = useState(false)

    const [editID, setProjectId] = useState('')

    //const url = GlobalContants.BaseURL + 'users'; 

    const isEditpop = (id: SetStateAction<string>) => {
        setProjectId(id);
        setIsPopupOpen(true)
        post()
    }
    const closePopup = () => setIsPopupOpen(false)
    const post = () => setPost(true)

    const openPopup = () => setIsPopupOpen(true)

    //Get tasks
    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    //Post task
    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskID = editID;
        const newProject = { name, description, status };
        try {
            const response = await fetch(isEdit ? `http://localhost:3000/task/${taskID}` : 'http://localhost:3000/task', {
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
                alert(data.error || 'Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <>
        <div className="flex justify-end mb-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" >
             Add
            </button>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="text-left py-3 px-6">Name</th>
                <th className="text-left py-3 px-6">Description</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Actions</th>
            </tr>
            </thead>
            <tbody className="text-gray-700">
            {tasks.map((task, index) => (
                 <tr className="border-b hover:bg-gray-100" key={index}>
                 <td className="py-3 px-6">{task.title}</td>
                 <td className="py-3 px-6">{task.description}</td>
                 <td className="py-3 px-6">
                 <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{task.status}</span>
                 </td>
                 <td className="py-3 px-6 space-x-2">
                 <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                 <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                 </td>
             </tr>
            ))}
            </tbody>
        </table>
        </div>

        </>
    );
}

export default Task;
