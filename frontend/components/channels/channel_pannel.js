import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch} from 'react-router-dom'
/*
    ^^^ ajax utility function to call profile pic once resources are made available
    in backend to fetch profile pic
*/

const ChannelPannel = (props) => {

    const matchUrl = useRouteMatch().url;

    useEffect(() => {
        console.log("ChannelPannel author, child component", props.author)
    }, [])

    const logoSubscribeContainer = () => {
        return (
        <div className="logo-subscribe-container">
            <div className="logo-profile-name-container">
                <span>{props.author.username[0].toUpperCase()}</span>
                <div style={{
                    display: "flex", 
                    flexDirection: "column",
                    marginLeft: "20px"
                }}>
                    <h3>{props.author.username}</h3>
                    <span>{props.author.subscriber_count} subscribers</span>
                </div>
            </div>
            <div className="subscribe-button-container">
                <button>Subscribe</button>
            </div>
        </div>
        )
    }

    const buttonPannel = () => {
        return (
            <div className="channel-button-pannel-container">
                <Link to={`${matchUrl}`}>
                    <button>HOME</button>
                </Link>
                <Link to={`${matchUrl}/videos`}>
                    <button>VIDEOS</button>
                </Link>
                <Link to={`${matchUrl}/about`}>
                    <about>ABOUT</about>
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