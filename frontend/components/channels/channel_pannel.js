import React, {useEffect, useState} from 'react';
import {Link, useRouteMatch, Redirect, withRouter, useHistory} from 'react-router-dom';
/*
    ^^^ ajax utility function to call profile pic once resources are made available
    in backend to fetch profile pic
*/

const ChannelPannel = (props) => {

    const matchUrl = useRouteMatch().url;
    const history = useHistory();

    const subscribe = () => {
        if (props.currentUser === null) {
            // debugger
            return history.push("/login");
        } else {

            const subscriptionData = { ["content_creator_id"]: props.author.id, ["subscriber_id"]: props.currentUser.id };

            if (props.subscription === false) {
                // debugger
                props.createSubscription(subscriptionData);
            } else {
                // debugger
                props.destroySubscription(subscriptionData);
            }

        }
    }

    useEffect(() => {
        console.log("CHANNEL PANNEL PROPS:  ", props)
        console.log("CHANNEL PANNEL WHAT IS HISTORY:  ", history)
    }, [props])

    const subscribeButton = () => (
        !props.currentUser ? (
            <button className="subscribe-button" onClick={subscribe}>SUBSCRIBE</button>
        ) : (
            props.subscription === true ? (
                <button className="un-subscribe-button" onClick={subscribe}>UNSUBSCRIBE</button>
            ) : (
                <button className="subscribe-button" onClick={subscribe}>SUBSCRIBE</button>
            )
        )
    )

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
                {/* <button className="subscribe-button">SUBSCRIBE</button> */}
                {props.currentUser ?
                    ( props.currentUser.id === props.author.id ? null : subscribeButton() )
                : subscribeButton()}
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