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
            <h1>Tasks</h1> <button type="submit" onClick={openPopup}>Add User</button>

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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Project</th>
                        <th>Created Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                            <td>{task.projectid}</td>
                            <td>{task.createdat}</td>
                            <td onClick={() => isEditpop(task.id)}>Edit</td>
                            <td>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Task;
