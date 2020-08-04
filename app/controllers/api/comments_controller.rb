class Api::CommentsController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]

    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id
        @comment.author = current_user.username
        @comment.video_id = params[:comment][:video_id]
        @comment.body = params[:comment][:body]
        @comment.parent_id = params[:comment][:parent_id]

        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update
        @comment = current_user.comments.find(params[:id])
        if @comment.update(comment_edit_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = current_user.comments.find(params[:id])
        @comment.destroy
        render :show
    end
    
    private
    
    def comment_params
        params.require(:comment).permit(:video_id, :body, :parent_id)
    end

    def comment_edit_params
        params.require(:comment).permit(:body)
    end

end
