class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def show_author
        @user = User.find(params[:author_id])

        render json: {
            "id" => @user.id,
            "username" => @user.username,
            "email" => @user.email,
            "subscriber_count" => @user.number_of_subscribers
        }, status: 200
    end

    def upload_banner
        begin
            @user = User.find(params[:user_id])
        rescue
            @user = nil
        end
        debugger
        if @user
            if @user.update(user_banner)
                debugger
                render :banner
                debugger
            else
                debugger

                render json: { error: 'Could not upload banner' }, status: 400
            end
        else
            debugger
            render json: { error: 'Could not find user' }, status: 404
        end
    end

    def banner
        begin
            @user = User.find(params[:id])
        rescue
            @user = nil
        end

        if (@user && @user.channel_banner.attached?)
            render :banner, status: 200
        else
            render json: { error: 'No Banner for specified user' }, status: 400
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :email) 
        # I believe I should require email here? check with PA
    end     

    def user_banner
        params.require(:user).permit(:channel_banner)
    end

end
