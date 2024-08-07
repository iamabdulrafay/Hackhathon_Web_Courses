import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./CourseDesc.css";

import ButtonCustom from '../button/ButtonCustom';

const CourseDesc = () => {
    const { id } = useParams();  // Get id from route params
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseDets = async () => {
            if (id) {  // Ensure courseId is valid
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/v1/courses/${id}/?format=json`);
                    setCourse(response.data);  // Assuming response data is an object
                } catch (error) {
                    console.error("Error fetching course details:", error);
                }
            } else {
                console.error("Course ID is not provided");
            }
        };
        fetchCourseDets();
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div className='classes'>
            <div className="flex">
                <div className="left">
                    <h1>{course.title}</h1>
                    <div className="tags-div">
                        {course.course_tags.split(',').map((tag, index) => (
                            <span key={index} className="tags">{tag.trim()}</span>
                        ))}
                    </div>
                    <p className="price"><strong>Only <span>${course.price}</span></strong></p>
                    <ButtonCustom width="70%" color="#009560" height="8vh" text="Buy Now" />
                    <p className='ques'>{course.description}</p>
                </div>
                <div className="right">
                    <img src={course.image_url} alt={course.title} />
                </div>
            </div>
        </div>
    );
}

export default CourseDesc;
