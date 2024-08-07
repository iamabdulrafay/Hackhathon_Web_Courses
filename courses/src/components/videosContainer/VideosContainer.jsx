import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./VideosContainer.css";

const VideosContainer = () => {
  const { courseId, outlineId } = useParams();  // Extract both courseId and outlineId from URL
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/course_outlines/', {
          params: { course_id: courseId },
        });

        const outlines = response.data;
        const outlineWithVideos = outlines.find(outline => outline.id === parseInt(outlineId, 10));

        if (outlineWithVideos) {
          setVideos(outlineWithVideos.course_videos || []);
          if (outlineWithVideos.course_videos.length > 0) {
            setSelectedVideo(outlineWithVideos.course_videos[0]);
          }
        } else {
          console.warn('No outlines found for the given outline ID');
        }
      } catch (error) {
        console.error("Error fetching course videos:", error);
      }
    };

    if (courseId && outlineId) {
      fetchVideos();
    }
  }, [courseId, outlineId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowFullContent(false); // Reset content display on video change
  };

  const formatContent = (content, full = false) => {
    const lines = content.split('\n');
    const displayedLines = full ? lines : lines.slice(0, 2);

    return displayedLines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="videos-container">
      <div className="video-player">
        {selectedVideo ? (
          <div>
            <video key={selectedVideo.id} controls>
              <source src={selectedVideo.video_file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h2>{selectedVideo.title}</h2>
            <p>
              {formatContent(selectedVideo.video_content, showFullContent)}
              {!showFullContent && (
                <span className="see-more" onClick={() => setShowFullContent(true)}>See more</span>
              )}
            </p>
          </div>
        ) : (
          <p>Select a video to play</p>
        )}
      </div>
      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-item" onClick={() => handleVideoClick(video)}>
              <div className="left">
                <video key={video.id} controls width="200">
                  <source src={video.video_file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="right">
                <h2>{video.title}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available for this course outline.</p>
        )}
      </div>
    </div>
  );
};

export default VideosContainer;
