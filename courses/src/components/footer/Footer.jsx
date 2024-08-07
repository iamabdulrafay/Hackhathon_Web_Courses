import React from 'react';
import './Footer.css'; // Make sure this path is correct
import { Link } from 'react-router-dom';
import logo from "../../assets/codersnippets.png"
import privacy from "../../assets/privacy.pdf"
const Footer = () => {
  const handleDownloadAndOpen = (e) => {
    e.preventDefault();
    
    // Create a link element for downloading the PDF
    const link = document.createElement('a');
    link.href = privacy; // Use the imported PDF file
    link.download = "privacy.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open the PDF in a new tab
    window.open(privacy, "_blank");
  };
  return (
    <>
    
    
<div className="footer">
  <div className="one-row">
    <img className='logo' src={logo} alt="" />
    <p>lets Connect With Our Socials</p>
  </div>
  <div className="two-row">
    <h1><strong>Company</strong></h1>
<Link  className="link" to="/">Home</Link>
<Link className="link" to="/about">About Us</Link>
<a className="link" href={privacy} onClick={handleDownloadAndOpen}>
        Privacy Policy
      </a>
<Link className="link" to="/courses">Courses</Link>

  </div>
  <div className="three-row">    <h1><strong>Get In Touch</strong></h1>
    <p>0328535685</p>
    <p>087956235</p>
    <p>upwrok8000@gmail.com</p>
    <p>Karachi pakistan Nastp Malir</p>
    </div>
  {/* <div className="four-row"></div> */}
</div>
<div className="footer-bootom"><h1>Copyright © 2024 CoderzSnippets Pvt. Ltd. <br /> All Rights Reserved.</h1></div>
    </>
  );
};

export default Footer;
