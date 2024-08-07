import React, { useEffect, useState } from 'react'
import "./Card.css"
import logo from "../../assets/bg.jpg"
// import Button from '../button/Button'
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import ButtonCustom from '../button/ButtonCustom';
const Card = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/courses/");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
    
    
  return (
    <div className="card-container">
    {data.map((e)=>(

    <div className="card-main">

    <div className="card">
        <div className="top">
        <img src={e.image_url} alt={e.title} />
        </div>
        <div className="bottom">
 <h1>{e.title}</h1>
 < p className='desc'>{e.description}</p>
 
 {e.course_tags.split(',').map((tag, index) => (
                            <button key={index} className='btn'>
                                {tag.trim()} {/* Trim to remove extra spaces */}
                            </button>
                        ))}
{/* <button className='btn'>Logic Building</button>
<button className='btn'>Designing </button> */}
<div className="instructor">
    <div className="left">

    <p>by <span>{e.instructor_name}</span> </p>
    </div>
    <div className="right">
        <p>${e.price}</p>
    </div>
</div>

        </div>
    </div>
    <Link to={`/courses/${e.id}`}>
            <ButtonCustom width="100%" text={"Buy Now"} />
          </Link>
    </div>
    ))}
 </div>
  )
}

export default Card