import {
    CREATE_SUBSCRIPTION,
    GET_SUBSCRIPTION,
    DESTROY_SUBSCRIPTION,
    REMOVE_SUB_DATA,
    ADD_SUB_ERROR
} from '../actions/subscription_actions'

export default ( state = {}, action ) => {
    Object.freeze(state)
    let newState;

    switch(action.type) {
        case CREATE_SUBSCRIPTION:
            newState = { subscription: true };
            return newState;

        case GET_SUBSCRIPTION:
            newState = { subscription: true };
            return newState;

        case DESTROY_SUBSCRIPTION:
            return {};

        case REMOVE_SUB_DATA:
            return {};

        case ADD_SUB_ERROR:
            return { error: true };

        default: 
            return state
    }
    
    
}   