import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./CourseStats.css";

const CourseStats = ({courseId}) => {
    // const { id: courseId } = useParams(); // Extract courseId from URL parameters
    const [courseDets, setCourseDets] = useState(null);

    useEffect(() => {
        const fetchCourseDets = async () => {
            if (courseId) {  // Ensure courseId is valid
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/v1/course_details/', {
                        params: { course_id: courseId }  // Pass courseId as a query parameter
                    });
                    setCourseDets(response.data[0]);  // Assuming response data is an array
                } catch (error) {
                    console.error("Error fetching course details:", error);
                }
            } else {
                console.error("Course ID is not provided");
            }
        };
        fetchCourseDets();
    }, [courseId]);

    if (!courseDets) {
        return <div>Loading...</div>;
    }

    return (
        <div className='coursestats'>
            <img src={courseDets.image_one_url} alt="Course One" className="poster-theme" />
            {/* <img src={courseDets.image_two_url} alt="Course Two" className="poster-theme" /> */}
            <h1 className='sub-heading'>{courseDets.course_short_title}</h1>
            <h1 className='image-text'>{courseDets.course_level}</h1>
        </div>
    );
}

export default CourseStats;
