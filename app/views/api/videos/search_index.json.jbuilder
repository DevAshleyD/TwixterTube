json.array!(@users) do |user|
   json.id user.id
   json.username user.username
   json.email user.email
   json.numberOfSubs user.number_of_subscribers
   json.numberOfVideos user.number_of_videos
   json.about user.about
   json.user true
end

json.array!(@videos) do |video|
    json.partial! 'api/videos/video', video: video
    # json.videoUrl url_for(video.vid)
    json.thumbnailUrl url_for(video.thumbnail)
    json.published video.created_at.strftime('%B %d, %Y')
    json.publishedAgo time_ago_in_words(video.created_at)
end



# @users.each do |user|
#     user.videos.each
# end

# users + videos, use if using variables for the
# json arrays that are constructed as an alternative to get desired result

