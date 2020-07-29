import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'

const Videos = (props) => {

    useEffect(() => {
        console.log('IN VIDEO COMPONENT, AUTHOR:  ', props.author)
        console.log('IN VIDEO COMPONENT, VIDEOS:  ', props.videos)
    }, [])

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

    return (
        <div className="channel-videos-main-container">
            {/* {JSON.stringify(props.videos)} */}
            {videoList()}
        </div>
    )
}

export default Videos;