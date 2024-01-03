import React from 'react';
import "../Model/DeleteModel.css";


const Model = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
   
    <div className="model">
      <label className='model-label'>
        <h3 style={{textAlign:"center"}}>{title}</h3>
        <p>{message}</p>
        </label>
        <div className='btns'>
          <button style={{backgroundColor:"#007bff",color:"white" ,padding: "8px 12px",border:"none"}} onClick={onConfirm}>Confirm</button>
          <button  style={{ backgroundColor : "red",color:"white", padding: "8px 12px",border:"none"}}className='deleteCancel' onClick={onClose}>Cancel</button>
        </div>
      </div>
   
  );
};

export default Model;
