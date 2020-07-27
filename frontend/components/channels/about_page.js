import React, {useEffect, useState} from 'react';
import {numberWithCommas} from '../../util/videos_util'

const About = (props) => {
    const [viewEmail, setViewEmail] = useState(false);

    useEffect(() => {
        console.log("IN THE ABOUT PAGE, HERE ARE PROPS:  ", props)
    }, [])

    let emailButtonStyling = viewEmail ? "hidden" : "view-email-address-button";
    let emailStyling = viewEmail ? "email-p-style" : "hidden";

    const descriptionDetailsContainer = () => (
        <div className="description-details-container">
            <div className="description-container">
                <p>Description</p>
                {/* <p>{props.author.about ? props.author.about : 
                "User has no description."
                }</p> */}
                <p>{props.author.about}</p>
            </div>

            <div className="details-container">
                <p>Details</p>

                <div className="details-section-container">
                    <span>For business inquiries:</span>
                    <button className={emailButtonStyling}
                            onClick={() => {
                                setViewEmail(true)
                            }}>VIEW EMAIL ADDRESS</button>
                    <span className={emailStyling}>{props.author.email}</span>
                </div>

                {/* <div>
                    <span>Location:</span>
                    <span></span>
                </div> */}
            </div>
        </div>
    )

    const statsContainer = () => (
        <div className="stats-about-main-container">
            <h3>Stats</h3>
            <p>Joined {props.author.joined}</p>
            <p>{ props.author.views ? numberWithCommas(props.author.views) : 0} views</p>
        </div>
    )
    
    return (
        <div className="about-content-main-container">
            {descriptionDetailsContainer()}
            {statsContainer()}
        </div>
    )

}

export default About;