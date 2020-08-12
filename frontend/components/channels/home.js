import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../util/videos_util';

const Home = (props) => {

    const vid = props.video[0];

    // useEffect(() => {
    //     console.log("IN HOME COMPONENT, WHAT IS PROPS:  ", props)
    // }, [])

    const description = () => (
        <div className="channel-home-description-container">
            <Link to={`/videos/${vid.id}`} style={{ textDecoration: "none", color: "black" }}>
                <h3>
                    {vid.title}
                </h3>
            </Link>
            <p>
                {numberWithCommas(vid.views)} views · {vid.publishedAgo} ago
            </p>

            <p>
                {vid.description ? vid.description : "Video has no description."}
            </p>
        </div>
    )

    const mainSection = () => (
        <div className="channel-home-main-section">
            <video
                controls
                key={vid.videoUrl}
                style={{
                    width: "500px",
                    height: "281px",
                    marginRight: "50px",
                    background: "black"
                }}
            >
                <source src={vid.videoUrl}/>
            </video>
            {description()}
        </div>
    )

    const noContentDisplay = () => (
        <div className="no-content">
            This channel doesn't have any content
        </div>
    )

    return (
        <div className="channel-home-main-container">
            {vid ? mainSection() : noContentDisplay()}
        </div>
    )
}

export default Home;