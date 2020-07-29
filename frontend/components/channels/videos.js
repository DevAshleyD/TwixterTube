import React, {useEffect} from 'react';

const Videos = (props) => {

    useEffect(() => {
        console.log('IN VIDEO COMPONENT, AUTHOR:  ', props.author)
        console.log('IN VIDEO COMPONENT, VIDEOS:  ', props.videos)
    }, [])

    const handleClick = () => {
        
    }

    const parseViews = (views) => {

    }

    const parseTitle = (title) => {
        return title.length > 60 ? title.slice(0, 60) + "..." : title;
    }

    const videoList = () => (
        <ul className="channel-video-list">
            {props.videos.map( (video, id) => (
                <li key={`video-channel+${video.id}`} className="channel-video-list-item">
                    <img src={video.thumbnailUrl}/>
                    <div className="channel-video-item-details-container">
                        <h4>{video.title}</h4>
                        <p>{}</p>
                    </div>
                </li>
            ))}
        </ul>
    )

    return (
        <div className="channel-videos-main-container">
            {JSON.stringify(props.videos)}
        </div>
    )
}

export default Videos;