import {
    CREATE_SUBSCRIPTION,
    GET_SUBSCRIPTION,
    DESTROY_SUBSCRIPTION,
    REMOVE_SUB_DATA,
    ADD_SUB_ERROR
} from '../actions/subscription_actions';

import {
    RECEIVE_CONTENT_CREATOR
} from '../actions/user_actions';

export default ( state = {}, action ) => {
    Object.freeze(state)
    let newState;

    switch(action.type) {
        case CREATE_SUBSCRIPTION:
            newState = Object.assign({}, state, { subscription: true });
            return newState;

        case GET_SUBSCRIPTION:
            newState = Object.assign({}, state, { subscription: true });
            return newState;

        case DESTROY_SUBSCRIPTION:
            return {};

        case REMOVE_SUB_DATA:
            return {};

        case ADD_SUB_ERROR:
            return { error: true };

        case RECEIVE_CONTENT_CREATOR:
            newState = Object.assign({}, state, { authorId: action.user.id });

        default: 
            return state
    }
    
    
}   