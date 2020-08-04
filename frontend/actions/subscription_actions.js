import * as SubUtil from '../util/subscription_util'

// {
//     fetchSubscriptions,
//     createSubscription,
//     getSubscription,
//     destroySubscription
// }

export const CREATE_SUBSCRIPTION = "CREATE_SUBSCRIPTION"
export const GET_SUBSCRIPTION = "GET_SUBSCRIPTION";
export const DESTROY_SUBSCRIPTION = "DESTROY_SUBSCRIPTION";
export const REMOVE_SUB_DATA = "REMOVE_SUB_DATA"
export const ADD_SUB_ERROR = "ADD_SUB_ERROR";

const subscribe = () => ({
    type: CREATE_SUBSCRIPTION
})

const fetchSubscribe = () => ({
    type: GET_SUBSCRIPTION
})

const unsubscribe = () => ({
    type: DESTROY_SUBSCRIPTION
})

const addSubError = () => ({
    type: ADD_SUB_ERROR
})

export const removeSubscriptionData = () => ({
    type: REMOVE_SUB_DATA
})

export const getSubscription = (subscription) => dispatch => {

    return SubUtil.getSubscription(subscription).then( 
        () => dispatch(fetchSubscribe()),
        err => dispatch(addSubError())
    )

}

export const createSubscription = (subscription) => dispatch => {
    debugger
    return SubUtil.createSubscription(subscription).then( 
        () => dispatch(subscribe()),
        err => dispatch(addSubError())
    )
}

export const destroySubscription = (subscription) => dispatch => {
    return SubUtil.destroySubscription(subscription).then( 
        () => dispatch(unsubscribe()),
        err => dispatch(addSubError())
    )
}
