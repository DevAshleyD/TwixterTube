json.video do
    json.partial! 'api/videos/video', video: @video
    json.videoUrl url_for(@video.vid)
    json.thumbnailUrl url_for(@video.thumbnail)
    json.published @video.created_at.strftime('%B %d, %Y')
    json.likes @video.num_likes
    json.dislikes @video.num_dislikes
end

json.user do
    json.extract! @video.uploader, :id, :username, :email
end

if current_user
    likes = @video.likes.select { |like| like.user_id == current_user.id }
    current_like = likes[0]

    if current_like != nil
        json.like do 
            json.extract! current_like, :id, :user_id, :likeable_id, :likeable_type, :liked
        end
    end

end

@video.comments.each do |comment| 

    if !!comment.parent_id
        next
    end
            
    json.comments do

        json.set! comment.id do                    
            json.id comment.id
            json.user_id comment.user_id
            json.body comment.body
            json.author comment.author
            json.video_id @video.id
            json.likes comment.num_likes
            json.dislikes comment.num_dislikes

            if current_user && !!comment.likes.find_by(user_id: current_user.id)
                like = comment.likes.find_by(user_id: current_user.id)
                if like.liked 
                    json.liked true
                    json.like_id like.id
                else          
                    json.liked false
                    json.like_id like.id                        
                end
            end

            json.child_comments do 
                comment.comments.each do |child_comment|
                    json.set! child_comment.id do 
                        json.id child_comment.id
                        json.user_id child_comment.user_id
                        json.body child_comment.body
                        json.author child_comment.author
                        json.video_id @video.id
                        json.likes child_comment.num_likes
                        json.dislikes child_comment.num_dislikes
                        json.parent_id child_comment.parent_id

                        # boolean like logic goes here
                        if current_user && !!child_comment.likes.find_by(user_id: current_user.id)
                            like = child_comment.likes.find_by(user_id: current_user.id)
                            if like.liked 
                                json.liked true
                                json.like_id like.id
                            else          
                                json.liked false
                                json.like_id like.id                        
                            end
                        end
                        
                    end
                end
            end
            
        end
    end
end

