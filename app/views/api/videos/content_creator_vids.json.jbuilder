json.videos @videos.each do |video|
    json.partial! 'api/videos/video', video: video
    json.thumbnailUrl url_for(video.thumbnail)
    json.published video.created_at.strftime('%B %d, %Y')
    json.publishedAgo time_ago_in_words(video.created_at)
end

# reference jbuilder github to make an array of videos with above attributes, test in react entry point

json.author @author_model