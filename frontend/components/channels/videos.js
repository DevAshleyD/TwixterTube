import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignal } from "@fortawesome/free-solid-svg-icons";

const Videos = (props) => {

    // useEffect(() => {
    //     console.log('IN VIDEO COMPONENT, AUTHOR:  ', props.author)
    //     console.log('IN VIDEO COMPONENT, VIDEOS:  ', props.videos)
    // }, [])

    const parseViews = (views) => {
        return views > 1000 ? Math.floor(views / 1000) + "k" : views;
    }

    const parseTitle = (title) => {
        return title.length > 60 ? title.slice(0, 60) + "..." : title;
    }

    const videoList = () => (
        <ul className="channel-video-list">
            {props.videos.map( (video, id) => (
                <Link to={`/videos/${video.id}`} style={{ textDecoration: "none", height: "186.8px" }}>
                    <li key={`video-channel+${video.id}`} className="channel-video-list-item">
                        <img src={video.thumbnailUrl}/>
                        <div className="channel-video-item-details-container">
                            <h4>{parseTitle(video.title)}</h4>
                            <p>{parseViews(video.views)} views · {video.publishedAgo} ago</p>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    )

    /*
        Video List Header, you need to make backend api/redux state changing actions 

        to change order of videos based on three criteria

        1) Most Popular
        2) Date Added (oldest)
        3) Date Added (newest)

        and make the query selection come from a modal that pops up from clicking 
            "channel-sort-by-button"
    */ 

    const videoListHeader = () => (
        <div className="channel-video-list-header">
            <h3>Uploads</h3>
            <button className="channel-sort-by-button">
                <FontAwesomeIcon icon={faSignal} className="uploads-sort-by-icon" />
                <h3>SORT BY</h3>
            </button>
        </div>
    )

    const noVideos = () => (
        <div className="no-content">
            This channel has no videos.
        </div>
    )

    return (
        <div className="channel-videos-main-container">
            {/* {JSON.stringify(props.videos)} */}
            {props.videos.length > 0 ? videoList() : noVideos()}
        </div>
    )
}

export default Videos;