import React from 'react'
import "./ButtonCustom.css"
const ButtonCustom = ({ text, onClick, type = 'button' ,width ,color ,height}) => {
    return (
      <div className="btn-new">
        <button style={{background:color ,width:width ,height:height}} type={type} onClick={onClick}>
          {text}
        </button>
      </div>
    );
  };

export default ButtonCustom