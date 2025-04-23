import React from 'react';
import './popup.css'
function Popup(props){

  return (
  <>
  <div className="popup-overlay">
    <div className="popup">
    {props.children}
    </div>

  </div>
  </>
  
  )

}

export default Popup;
