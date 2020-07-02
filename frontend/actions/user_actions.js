import {fetchUser} from '../util/user_util'

export const RECEIVE_CONTENT_CREATOR = "RECEIVE_CONTENT_CREATOR";

const receiveContentCreator = (user) => ({
    type: RECEIVE_CONTENT_CREATOR,
    user
});

export const fetchContentCreator = (authorId) => dispatch =>
    fetchUser(authorId).then((user) =>
        dispatch(receiveContentCreator(user))
    );