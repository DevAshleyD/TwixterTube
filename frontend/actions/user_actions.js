import {fetchUser, fetchBanner, fetchAuthor, fetchAuthorAbout} from '../util/user_util'

export const RECEIVE_CONTENT_CREATOR = "RECEIVE_CONTENT_CREATOR";
// export const RECEIVE_CREATOR_BANNER = "RECEIVE_CREATOR_BANNER";
export const RECEIVE_CONTENT_CREATOR_ABOUT = "RECEIVE_CONTENT_CREATOR_ABOUT";
// ^^^ ALSO UTILIZE IN VIDEO REDUCER TO CLEAR OUT VIDEOS SINCE ABOUT PAGE DOES NEED A VIDEO IN STATE

const receiveContentCreator = (user) => ({
    type: RECEIVE_CONTENT_CREATOR,
    user
});

const receiveCreatorBanner = (bannerUrl) => ({
    type: RECEIVE_CREATOR_BANNER,
    bannerUrl
})

const receiveContentCreatorAbout = (user) => ({
    type: RECEIVE_CONTENT_CREATOR_ABOUT,
    user
})

export const fetchContentCreatorAbout = (authorId) => dispatch =>
    fetchAuthorAbout(authorId).then( user => {
        dispatch(receiveContentCreatorAbout(user));
    })

export const fetchContentCreator = (authorId) => dispatch =>
    fetchAuthor(authorId).then((user) =>
        dispatch(receiveContentCreator(user))
    );

// export const fetchChannelBanner = (userId) => dispatch =>
//     fetchBanner(userId).then(  )