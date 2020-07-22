import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom'
/*
    ^^^ ajax utility function to call profile pic once resources are made available
    in backend to fetch profile pic
*/

const ChannelPannel = (props) => {

    const matchUrl = useRouteMatch().url;

    useEffect(() => {
        console.log("PANNEL, PROPS", props.location)

    }, [props.location])

    const logoSubscribeContainer = () => {
        return (
        <div className="logo-subscribe-container">
            <div className="logo-profile-name-container">
                <span>{props.author.username[0].toUpperCase()}</span>
            </div>
            <div className="subscribe-button-container">
                <div style={{
                        display: "flex", 
                        flexDirection: "column",
                        marginLeft: "20px"
                    }}
                    className="author-name-subscriber-count-container"    
                >
                    <h3>{props.author.username}</h3>
                    <span>{props.author.subscriber_count} subscribers</span>
                </div>
                <button className="subscribe-button">Subscribe</button>
            </div>
        </div>
        )
    }

    /*
    props.location !== "videos" 
                        &&
                        props.location !== "about" ? "channel-tab-selected" : ""
    
    */

    const buttonPannel = () => {
        return (
            <div className="channel-button-pannel-container">
                <Link to={`${matchUrl}`}>
                    <button style={{borderBottom: props.location !== "videos" 
                        &&
                        props.location !== "about" ? "3px solid black" : ""}}>HOME</button>
                </Link>
                <Link to={`${matchUrl}/videos`}>
                    <button style={{borderBottom: props.location === "videos" ? "3px solid black" : ""}}>VIDEOS</button>
                </Link>
                <Link to={`${matchUrl}/about`}>
                    <button style={{borderBottom: props.location === "about" ? "3px solid black" : ""}}>ABOUT</button>
                </Link>
            </div>
        )
    }
    
    return (
        <div className="channel-pannel-main-container">
            {logoSubscribeContainer()}
            {buttonPannel()}
        </div>
    )
    
}

export default ChannelPannel;