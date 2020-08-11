import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
    
const SearchUserIndexItem = (props) => {

    /*
        Read further below to understand commenting out reasoning
    */

    // useEffect( () => {
        
    //     if (props.currentUser === null) {
            
    //     }

    // }, [])

    function handleUserClick(e) {
        props.history.push(`/user/${props.user.id}`)
    }

    let username = props.user.username;
    let numberOfSubs = props.user.numberOfSubs;
    let numberOfVideos = props.user.numberOfVideos;
    let about = props.user.about;

    if (numberOfSubs >= 1000) {
        numberOfSubs = Math.floor( numberOfSubs / 1000 ) + "k";
    }

    if (about && about.length > 100) {
        about = about.slice(0, 100) + "...";
    }

    /*
        commented out subscription buttons and logic will create issues if multiple users are rendered
        on query due to state being modeled for one subscription at a time

        refactor redux state to allow for multiple subscriptions of various users once deadlines are extended

        will have to refactor changes to be made on channel container to reflect changes
    */

    // function subscribe() {
    //     if (props.currentUser === null) {
    //         handleUserClick();
    //     } else {
            
    //         const subscriptionData = { content_creator_id: props.user.id, subscriber_id: props.currentUser.id };
            

    //     }
    // }

    // function unsubscribe() {
        
    // }

    // let subscribeButton = (<button onClick={subscribe}>SUBSCRIBE</button>);

    // let subscribedButton = (<button onClick={unsubscribe}>SUBSCRIBED</button>);

    return (
        <li className="search-user-index-item" onClick={handleUserClick}>
            <div >
                <span>{username[0].toUpperCase()}</span>
            </div>

            <div className="user-index-item-details">
                <h3>{username}</h3>
                <p>{numberOfSubs} subscribers • {numberOfVideos} videos</p>
                <p>{about}</p>
            </div>

            {/* <div >
                {props.currentUser ? (
                    
                ) : (
                    
                )}
            </div> */}
        </li>
    )
    
    
}   
    
export default withRouter(SearchUserIndexItem);