export const fetchVideos = (query) =>
  $.ajax({
    url: `/api/videos`,
    method: `GET`,
    data: { query },
  });

export const fetchVideo = (id) => {
  return $.ajax({
    url: `/api/videos/${id}`,
    method: `GET`,
  })
};

export const postVideo = (formData) =>
  $.ajax({
    url: `/api/videos`,
    method: `POST`,
    data: formData,
    contentType: false,
    processData: false,
  });

export const editVideo = (payload) => {
  // console.log(
  //   "HERE IN THE VIDEO UTIL, WHAT DOES VIDEO FORM LOOK LIKE:   ",
  //   payload
  // );
  let formData = payload.formData;
  let videoId = payload.videoId;
  // console.log("HERE IS THE VIDEO ID:  ", videoId);
  // debugger;
  return $.ajax({
    url: `/api/videos/${videoId}`,
    method: `PATCH`,
    data: formData,
    contentType: false,
    processData: false,
  });
};

export const deleteVideo = (id) =>
  $.ajax({
    url: `/api/videos/${id}`,
    method: `DELETE`,
  });

export const updateVideoViewCount = (video) => {
  return $.ajax({
    url: `/api/videos/${video.id}/views`,
    method: "PATCH",
    data: { video },
  });
};

export const fetchContentCreatorVids = (authorId) => {
  return $.ajax({
    url: `/api/videos/content_creator/${authorId}`,
    method: "GET"
  })
}

export const fetchMostViewedVideo = (authorId) => {
  return $.ajax({
    url: `/api/videos/content_creator/${authorId}/most_viewed`,
    method: 'GET'
  })
}