import { useState, useEffect, SetStateAction } from 'react';
import { getData, postData } from '../../services/api';
import Card from '../Modules/Components/card';
import Popup from '../Modules/Components/popup';

function Project() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const  handlePopupSubmit = async (data: any) => {
    try {
      const response = await postData('project', data);
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

    loadProjects();
  

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
      <Card key={index} items={project} />
       ))}
      </div>
      {isPopupOpen && <Popup closePopup={() => setIsPopupOpen(false)} onSubmit={handlePopupSubmit}/>}
    </div>
    </>
  );
}

export default Project;
