json.videos do 
    if !@video
        json.id nil
    else
        json.partial! 'api/videos/video', video: @video
        json.videoUrl url_for(@video.vid)
        json.published @video.created_at.strftime('%B %d, %Y')
    end
end