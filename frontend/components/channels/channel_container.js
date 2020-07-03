import { connect } from "react-redux";
import Channel from './channel';
import {
    removeSubscriptionData,
    getSubscription,
    createSubscription,
    destroySubscription
} from '../../actions/subscription_actions';
    
import {
    fetchContentCreatorVids
} from '../../actions/videos_actions';
    
const msp = (state, ownProps) => {
    let currentUser = state.session.currentUser ? state.entities.users[state.session.currentUser] : null;
    let author = state.subscription.authorId ? state.entities.users[state.subscription.authorId] : null;

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
        destroySubscription: () => dispatch(destroySubscription()),
        getSubscription: (subscriptionData) => dispatch(getSubscription(subscriptionData)),
        createSubscription: (subscriptionData) => dispatch(createSubscription(subscriptionData)),
        fetchContentCreatorVids: (authorId) => dispatch(fetchContentCreatorVids(authorId))
    }
    
}   
    
export default connect(msp, mdp)(Channel);