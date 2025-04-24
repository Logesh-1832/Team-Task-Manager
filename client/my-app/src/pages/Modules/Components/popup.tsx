import React from 'react';
import './popup.css'
function Popup(props, isEdit) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [isPopupOpen, setIsPopupOpen] = useState(false)


  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <div>
            <form onSubmit={handleSubmit}>
              {props.children.map((prop, index) => (
                <input key={index}
                  type="text"
                  placeholder="Project Name"
                  value={prop.name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              ))}
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
        </div>

      </div>
    </>

  )

}

export default Popup;
