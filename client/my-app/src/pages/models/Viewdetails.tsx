import { useState } from "react";
import { putData } from "../../services/api";
import Form from "../components/form";
import Popup from "../components/popup";
import { useNavigate } from 'react-router-dom';

function ViewDetails( props){
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isViewTask, setIsViewTask] = useState(false);

    const navigate = useNavigate();
    const edit = () => {
        setIsEdit(true)
        setIsEditPopupOpen(true)
    };
    const viewTask = () => {
        setIsViewTask(true);
        navigate('/task', { state: { id: props.project.id } });
    };
    const  handleFormSubmit = async (data: any) => {
        try {
          await putData(`project/${props.project.id}`, data);
        } catch (error) {
          console.error('Error:', error);
        }
      };    return(
        <>
            <div>
                <h2 className="text-2xl font-bold mb-2">{props.project.name}</h2>
                <p className="mb-2"><strong>Description:</strong> {props.project.description}</p>
                <p className="mb-2"><strong>Status:</strong> {props.project.status}</p>
                <p className="text-sm text-gray-500"><strong>Created At:</strong> {new Date(props.project.createdat).toLocaleString()}</p>

                <div className="flex space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={edit}>
                        Edit
                    </button>      
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={viewTask}>
                        View Task
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={() => setIsEditPopupOpen(false)}>
                        Close
                    </button>
                </div>
            </div>

            {isEdit && isEditPopupOpen && (
                <Popup closePopup={function () { setIsEditPopupOpen(false); }}>
                    <Form  onSubmit={handleFormSubmit}
                        closePopup={function () { setIsEditPopupOpen(false); }} project={props.project} page={props.page}
                    />
                </Popup> 
            )}
        </>
    )
}

export default ViewDetails