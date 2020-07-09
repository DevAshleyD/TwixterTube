import {fetchUser, fetchBanner, fetchAuthor} from '../util/user_util'

export const RECEIVE_CONTENT_CREATOR = "RECEIVE_CONTENT_CREATOR";
// export const RECEIVE_CREATOR_BANNER = "RECEIVE_CREATOR_BANNER";

const receiveContentCreator = (user) => ({
    type: RECEIVE_CONTENT_CREATOR,
    user
});

const receiveCreatorBanner = (bannerUrl) => ({
    type: RECEIVE_CREATOR_BANNER,
    bannerUrl
})

export const fetchContentCreator = (authorId) => dispatch =>
    fetchAuthor(authorId).then((user) =>
        dispatch(receiveContentCreator(user))
    );

// export const fetchChannelBanner = (userId) => dispatch =>
//     fetchBanner(userId).then(  )