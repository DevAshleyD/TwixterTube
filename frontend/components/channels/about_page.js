import React, {useEffect, useState} from 'react';

const About = (props) => {
    const [viewEmail, setViewEmail] = useState(false);

    useEffect(() => {
        console.log("IN THE ABOUT PAGE, HERE ARE PROPS:  ", props)
    }, [])

    const descriptionDetailsContainer = () => (
        <div className="description-details-container">
            <div className="description-container">
                <p>Description</p>
                {/* <p>{props.author.about ? props.author.about : 
                "User has no description."
                }</p> */}
                <p>Author's Details</p>
            </div>

            <div className="details-container">
                <p>Details</p>

                <div className="details-section-container">
                    <span>For business inquiries:</span>
                    <button>VIEW EMAIL ADDRESS</button>
                </div>

                {/* <div>
                    <span>Location:</span>
                    <span></span>
                </div> */}
            </div>
        </div>
    )

    const statsContainer = () => (
        <div >

        </div>
    )
    
    return (
        <div className="about-content-main-container">
            {descriptionDetailsContainer()}
        </div>
    )

}

export default About;