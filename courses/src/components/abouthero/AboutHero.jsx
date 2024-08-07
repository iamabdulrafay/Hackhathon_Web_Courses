import React from 'react'
import "./AboutHero.css"
import AboutJourney from '../aboutjourney/AboutJourney';
import Instructor from '../instructor/Instructor';
const AboutHero = () => {
    const headingStyle = { transform: 'translate(0px, 0px)' };
  return (
    <>
    
    
    <div className="about-hero-main">

    <div className='about-hero'>
  <h1>
        <div><span style={headingStyle}> WHERE DREAMS </span></div>
        <div><span className='transform' style={headingStyle}>TRANSFORM </span></div>
        <div><span style={headingStyle}>INTO CODE </span></div>
      </h1>
      <div className="sideText">
        <h2><span style={headingStyle}>We are committed to providing</span></h2>
        <h2><span style={headingStyle}>programs that go beyond top-tier training </span></h2>
        <h2><span style={headingStyle}>traditional&nbsp;education</span></h2>
      </div>
    </div>
    </div>
    <h1 className='text-help'>Here’s how we can help</h1>
    {/* <div class="animDiv"></div> */}
    <div className="help">

    <video loop autoPlay src="https://ik.imagekit.io/sheryians/About%20Us/Webreel1_1_Y25mvxPxf.mp4?updatedAt=1710514764579"></video>
    </div>
    {/* <AboutJourney/> */}
    {/* <Instructor></Instructor> */}
    </>
  )
}

export default AboutHero