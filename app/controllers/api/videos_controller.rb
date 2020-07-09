class Api::VideosController < ApplicationController

    before_action :require_logged_in, only: [:create, :update, :destroy]
    
    def show
        @video = Video.find(params[:id])
        render :show
    end

    def index(query = '')
        query = params['query'] || ''

        if query == ''
            @videos = Video.first(20)
        else
            query = "%" + query.downcase + "%"
            @videos = Video.where('lower(title) like ? or lower(description) like ?', query, query);
        end

        render :index
    end

    def create
        @video = Video.new(video_params)
        @video.views = 0
        @video.uploader_id = current_user.id
        if @video.save
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def update
        @video = current_user.videos.find(params[:id])
        if @video.update(video_params_edit)
            render :show
        else
            render json: @video.errors.full_messages, status: 412
        end
    end

    def view_update
        @video = Video.find(params[:id])
        if @video.update(video_params_edit_views)
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def destroy
        @video = current_user.videos.find(params[:id])
        @video.destroy
        render :show
    end

    def content_creator_vids
        @videos = Video.where("uploader_id = ?", params[:author_id]).sort_by(&:created_at).reverse
        # desired fields from Author User model
        # keys = ["id", "username", "email"]
        @author_model = User.find(params[:author_id]).attributes.slice('id', 'username', 'email')
        
        render json: { 
            "videos" => @videos,
            "author" => @author_model
        }, status: 200
    end

    private

    def video_params
        params.require(:video).permit(:title, :description, :vid, :thumbnail)
    end

    def video_params_edit
        params.require(:video).permit(:title, :description, :thumbnail)
    end

    def video_params_edit_views
        params.require(:video).permit(:views)
    end

end
