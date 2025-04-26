// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../src/pages/components/sidebar';
import Dashboard from '../src/pages/models/dashboard';
import Project from './pages/project/project';
import Task from './pages/task/task';
// import other pages here

function App() {
  return (
    <Router>
        <Sidebar />
        <div className="ml-64 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project" element={<Project/>} />
            <Route path="/task" element={<Task/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
