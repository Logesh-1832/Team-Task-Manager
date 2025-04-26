// components/Popup.js
import React from 'react';

function Popup(props) {

  return (
    
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-5 text-gray-400 hover:text-black text-2xl"
          onClick={props.closePopup}>
          &times;
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
