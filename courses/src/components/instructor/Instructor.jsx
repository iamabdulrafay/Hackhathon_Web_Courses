import React from 'react'
import "./Instructor.css"
import myimage from "../../assets/me.jpeg"
const Instructor = () => {
  return (
    <div className='intructor'>

        <h1>Our Leaders.</h1>
        <div className="iamge-collage">
            <div className="left">
            <img src={myimage} alt=""/>
            <h1>Abdul Rafay <span>Founder & CEO</span></h1>
            </div>
            <div className="right">
            <img src={myimage} alt=""/>
            <h1>Abdul Rafay <span>Founder & CEO</span></h1>
            </div>
        </div>
    </div>
  )
}

export default Instructor