import { connect } from "react-redux";
import Channel from './channel'
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

export default connect(msp, mdp)(Channel)