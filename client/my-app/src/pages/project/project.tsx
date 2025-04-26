import { useState, useEffect, SetStateAction } from 'react';
import { getData, postData } from '../../services/api';
import Card from '../components/card';
import Form from '../components/form';
import Popup from '../components/popup';
import ViewDetails from '../models/Viewdetails';

function Project() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isAddNewPopupOpen, setIsAddNewPopupOpen] = useState(false);
  const [isViewDetailsPopupOpen, setIsViewDetailsPopupOpen] = useState(false);
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddClick = () => {
    setIsAddNew(true);
    setIsAddNewPopupOpen(true);
  };

  const viewDetails = (item: any) =>{
    setIsViewDetails(true);
    setSelectedProject(item);
    setIsViewDetailsPopupOpen(true);
  }

  const  handlePopupSubmit = async (data: any) => {
    try {
      await postData('project', data);
      loadProjects();
    } catch (error) {
      console.error('Error:', error);
    }
  };

    async function loadProjects() {
      try {
        const projectsData = await getData('projects');
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }

    useEffect(() => {
      loadProjects();
    }, []);
    
  return (
    <>
    <div className="p-6">
      <div className="flex justify-end mb-4">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300" onClick={handleAddClick}>
          Add
        </button>
       </div>
      <div className="flex flex-wrap gap-6">
      {projects.map((project, index) => (
      <Card key={index} items={project} onClick={() => viewDetails(project)}/>
       ))}
      </div>
      <div>
      {isAddNewPopupOpen && isAddNew && (
        <Popup closePopup={function () { setIsAddNewPopupOpen(false); }}>
          <Form
            onSubmit={handlePopupSubmit}
            closePopup={function () { setIsAddNewPopupOpen(false); }} page= "Project"
          />
        </Popup>
      )}
      </div>
        <div>
        {isViewDetails && isViewDetailsPopupOpen && selectedProject && (
        <Popup closePopup={function () { setIsViewDetailsPopupOpen(false); }}>
        <ViewDetails project={selectedProject} page= "Project"/>
        </Popup>
       )}
      </div>
    </div>
    </>
  );
}

export default Project;
