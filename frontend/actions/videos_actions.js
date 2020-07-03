import * as VideoUtil from "../util/videos_util";
// {
//     fetchVideos,
//     fetchVideo,
//     postVideo,
//     editVideo,
//     deleteVideo
// } from '../util/videos';

export const RECEIVE_ALL_VIDEOS = "RECEIVE_ALL_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const REMOVE_VIDEO = "REMOVE_VIDEO";
export const REMOVE_ALL_VIDEOS = "REMOVE_ALL_VIDEOS";
export const RECEIVE_UPLOADERS = "RECEIVE_UPLOADERS";
export const UPDATE_VIEW_COUNT = "UPDATE_VIEW_COUNT";
export const REMOVE_VIDEO_SHOW = "REMOVE_VIDEO_SHOW";
export const RECEIVE_ALL_VIDEOS_FROM_AUTHOR = "RECEIVE_ALL_VIDEOS_FROM_AUTHOR"

const receiveAllVideos = (payload) => ({
  type: RECEIVE_ALL_VIDEOS,
  payload,
});

// videos below are in array format

const receiveAllVideosFromAuthor = (payload) => ({
  type: RECEIVE_ALL_VIDEOS_FROM_AUTHOR,
  payload
})

export const receiveVideo = (payload) => {
  return { type: RECEIVE_VIDEO, payload };
};

const removeVideo = (payload) => ({
  type: REMOVE_VIDEO,
  videoId: payload.video.id,
});

const receiveUploaders = (payload) => ({
  type: RECEIVE_ALL_VIDEOS,
  payload,
});

const receiveUploader = (payload) => ({
  type: RECEIVE_VIDEO,
  payload,
});

export const updateViews = (payload) => {
  return {
    type: UPDATE_VIEW_COUNT,
    payload,
  };
};

export const removeAllVideos = () => ({
  type: REMOVE_ALL_VIDEOS,
});

export const removeVideoShow = () => ({
  type: REMOVE_VIDEO_SHOW,
});

export const fetchVideos = (query) => (dispatch) =>
  VideoUtil.fetchVideos(query).then((payload) =>
    dispatch(receiveAllVideos(payload))
  );

export const fetchVideo = (id) => (dispatch) => {
  return VideoUtil.fetchVideo(id).then((payload) => {
    dispatch(receiveVideo(payload));
  });
};

export const postVideo = (videoForm) => (dispatch) =>
  VideoUtil.postVideo(videoForm).then((payload) =>
    dispatch(receiveVideo(payload))
  );

export const editVideo = (videoForm) => (dispatch) =>
  VideoUtil.editVideo(videoForm).then((payload) =>
    dispatch(receiveVideo(payload))
  );

export const deleteVideo = (id) => (dispatch) =>
  VideoUtil.deleteVideo(id).then((payload) => {
    dispatch(removeVideo(payload));
  });

// video payload just has id and updated view count attributes that rails
// will only accept into the params

export const updateViewCount = (videoPayload) => (dispatch) =>
  VideoUtil.updateVideoViewCount(videoPayload).then((payload) => {
    dispatch(updateViews(payload));
  });

export const fetchContentCreatorVids = (contentCreatorId) => dispatch =>
  VideoUtil.fetchContentCreatorVids(contentCreatorId).then((payload) => {
    dispatch(receiveAllVideosFromAuthor(payload))
  })