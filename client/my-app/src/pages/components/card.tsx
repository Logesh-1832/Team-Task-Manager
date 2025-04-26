import Popup from "./popup";

function Card({ items, onClick}) {
  

  return (
      <div onClick={onClick} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{items.name}</h3>
        <p className="text-gray-600 mb-4">{items.description}</p>
        {/* <p className="text-gray-600 mb-4">{items.createdat}</p> */}
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
          {items.status}
        </span>
      </div>
    );
  }
  
export default Card;
  