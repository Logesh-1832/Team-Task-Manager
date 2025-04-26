import { ReactElement, useState } from "react";
import { putData } from "../../services/api";
import Form from "./form";
import Popup from "./popup";

function Table(props: any){
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isSelectedTask, setIsSelectedTask] = useState([]);
    
    const edit = (task: any) => {
        setIsEdit(true)
        setIsSelectedTask(task)
        setIsEditPopupOpen(true)
    };

    const  handleFormSubmit = async (data: any) => {
        try {
          await putData(`task/${isSelectedTask.id}`, data);
        } catch (error) {
          console.error('Error:', error);
        }
      }; 
      
    return (
        <>
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="text-left py-3 px-6">Name</th>
                <th className="text-left py-3 px-6">Description</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Priority</th>
                {/* <th className="text-left py-3 px-6">Project</th> */}
                <th className="text-left py-3 px-6">Actions</th>
            </tr>
            </thead>
            <tbody className="text-gray-700">
            {props.tasks.map((task, index) => (
                 <tr className="border-b hover:bg-gray-100" key={index}>
                 <td className="py-3 px-6">{task.title}</td>
                 <td className="py-3 px-6">{task.description}</td>
                 <td className="py-3 px-6">
                 <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{task.status}</span>
                 </td>
                 <td className="py-3 px-6">
                 <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">{task.priority}</span>
                 </td>
                 {/* <td className="py-3 px-6">{task.projectid}</td> */}
                 <td className="py-3 px-6 space-x-2">
                 <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => edit(task)}>Edit</button>
                 <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                 </td>
             </tr>
            ))}
            </tbody>
        </table>
        </div>

        {isEdit && isEditPopupOpen && (
                <Popup closePopup={function () { setIsEditPopupOpen(false); }}>
                    <Form  onSubmit={handleFormSubmit}
                        closePopup={function () { setIsEditPopupOpen(false); }} project={isSelectedTask} page={props.page} projectNames = {props.projectNames}
                    />
                </Popup> 
            )}
        </>
    ) 
}

export default Table;