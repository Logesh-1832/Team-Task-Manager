// Sidebar.js
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/project" className="hover:bg-gray-700 p-2 rounded">Project</Link>
        <Link to="/task" className="hover:bg-gray-700 p-2 rounded">Task</Link>
        {/* <Link to="/completed" className="hover:bg-gray-700 p-2 rounded">Completed Tasks</Link>

        <Link to="/task-stat" className="hover:bg-gray-700 p-2 rounded">Task Stat</Link> */}
      </nav>
    </div>
  );
}

export default Sidebar;
