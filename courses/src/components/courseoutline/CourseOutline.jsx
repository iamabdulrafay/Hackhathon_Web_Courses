import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CourseOutline.css";

const CourseOutline = ({ courseId }) => {
  const [courseOutline, setCourseOutline] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseOutlines = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/course_outlines/', {
          params: { course_id: courseId },
        });
        setCourseOutline(response.data);
      } catch (error) {
        console.error("Error fetching course outlines:", error);
      }
    };

    if (courseId) {
      fetchCourseOutlines();
    }
  }, [courseId]);

  const toggleContent = (id) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigateToVideos = (outlineId) => {
    navigate(`/videos/${courseId}/${outlineId}`);
  };

  return (
    <div className='course-outline'>
      <h1 className='main-heading'>Dominate.</h1>
      <h2 className='subTitle'>From Start to Victory.</h2>
      
      {courseOutline.length > 0 ? (
        courseOutline.map((outline) => (
          <div key={outline.id} className='dropdown-container'>
            <h2
              className="dropdown-heading"
              onClick={() => navigateToVideos(outline.id)}
              style={{ cursor: 'pointer', color: 'black' }}
            >
              {outline.section_title}
            </h2>
            <button className='dropdown-toggle' onClick={() => toggleContent(outline.id)}>
              {isExpanded[outline.id] ? 'Collapse' : 'Expand'}
            </button>
            <div className={`dropdown-content ${isExpanded[outline.id] ? 'expanded' : ''}`}>
              <p className="dropdown-title">{outline.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No outlines available for this course.</p>
      )}
    </div>
  );
};

export default CourseOutline;
