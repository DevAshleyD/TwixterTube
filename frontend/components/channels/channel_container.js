import { connect } from "react-redux";
import Channel from './channel';
import {
    removeSubscriptionData,
    getSubscription,
    createSubscription,
    destroySubscription
} from '../../actions/subscription_actions';
    
import {
    fetchContentCreator,
    fetchContentCreatorAbout
} from '../../actions/user_actions'
    
import {
    fetchContentCreatorVids,
    fetchMostViewedVideo,
    removeVideosFromChannel,
    removeAllVideos
} from '../../actions/videos_actions';
    
const msp = (state, ownProps) => {
    // console.log("CHANNEL CONTAINER PROPS MATCH:  ", ownProps.match.params.authorId)
    let authorId = ownProps.match.params.authorId;
    
    let currentUser = state.session.currentUser ? state.entities.users[state.session.currentUser] : null;
    let author = state.entities.users[authorId] ? state.entities.users[authorId] : null;

    console.log("CHANNEL CONTENT CREATOR:  ", author)

    let subscription = state.subscription.subscription ? true : false;

    let videos = state.entities.videos.length > 0 ? state.entities.videos : [];

    /*
        - need to allocate number of subscribers to channel's author in variable 
        - revisit and model actions and state to represent number of subscribers
    */

    return {
        currentUser,
        author,
        subscription,
        videos
    }
    
}
    
const mdp = (dispatch) => {
    
    return {
        removeSubscriptionData: () => dispatch(removeSubscriptionData()),
        destroySubscription: (subscriptionData) => dispatch(destroySubscription(subscriptionData)),
        getSubscription: (subscriptionData) => dispatch(getSubscription(subscriptionData)),
        createSubscription: (subscriptionData) => dispatch(createSubscription(subscriptionData)),
        fetchContentCreatorVids: (authorId) => dispatch(fetchContentCreatorVids(authorId)),
        fetchContentCreator: (authorId) => dispatch(fetchContentCreator(authorId)),
        fetchMostViewedVideo: (authorId) => dispatch(fetchMostViewedVideo(authorId)),
        removeVideosFromChannel: () => dispatch(removeVideosFromChannel()),
        fetchContentCreatorAbout: (authorId) => dispatch(fetchContentCreatorAbout(authorId)),
        removeAllVideos: () => dispatch(removeAllVideos())
    }
    
}   
    
export default connect(msp, mdp)(Channel);