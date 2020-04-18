debugger

json.extract! @comment, :id, :user_id, :video_id, :body, :author
if @comment.parent_id
    json.parent_id @comment.parent_id
end