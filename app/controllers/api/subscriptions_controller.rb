class Api::SubscriptionsController < ApplicationController
    before_action :require_logged_in, except: [:index]

    def create
        creator_id = params[:subscription][:content_creator_id]
        subscriber_id = params[:subscription][:subscriber_id]

        # check content creator existence in db
        begin
            User.find(creator_id)
        rescue
            return render json: { error: 'Content Creator Does not Exist'}, status: 404
        end

        # check subscribers existence in db
        begin
            User.find(subscriber_id)
        rescue
            return render json: { error: 'Subscriber Does not Exist'}, status: 404
        end

        @subscription = Subscription.new(subcription_params)
        
        if @subscription.save
            render json: { success: 'Subscription Valid' }, status: 200
        else
            render json: { error: 'Unable to save subscription details.'}, status: 422
        end
        
    end

    def index
        @subscriptions = Subscription.all
        render 'api/subscriptions/index'
    end

    def show
        @subscription = find_subscription
        
        if @subscription
            render json: { success: "Subscription Valid" }, status: 200
        else 
            render json: { error: "Subscription Not Found" }, status: 404
        end
        
    end

    def destroy
        @subscription = find_subscription
        
        if @subscription

            @subscription.destroy
            render json: { success: "Subscription Destroyed" }
        else

            render json: { error: "Subscription Not Found" }, status: 422
        end
        
    end

    def users_subscriptions
        
        
        
    end

    private

    def find_subscription
        creator_id = params[:subscription][:content_creator_id]
        subscriber_id = params[:subscription][:subscriber_id]

        subscription = Subscription.where("content_creator_id = ? AND subscriber_id = ?", creator_id, subscriber_id)[0]

        return subscription
    end

    def subcription_params
        params.require(:subscription).permit(:content_creator_id, :subscriber_id)
    end


end
