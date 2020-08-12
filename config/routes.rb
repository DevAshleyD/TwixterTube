Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    
    # user routes
    resources :users, only: [:create, :show, :update, :destroy]
    get '/user/banner/:user_id', to: 'users#banner'
    put '/user/banner/upload/:user_id', to: 'users#upload_banner'
    get '/user/author/:author_id', to: 'users#show_author'
    get '/user/author/:author_id/about', to: 'users#fetch_about_data'
    
    resource :session, only: [:create, :destroy]
    
    # resources :videos, only: [:create, :update, :destroy, :index, :show]
    resources :videos, except: [:new, :edit]
    patch '/videos/:id/views', to: 'videos#view_update'
    get '/videos/content_creator/:author_id', to: 'videos#content_creator_vids'
    get '/videos/content_creator/:author_id/most_viewed', to: 'videos#most_viewed_video'
    
    # subscription routes
    resources :subscriptions, only: [:create, :index]
    post '/subscriptions/delete', to: 'subscriptions#destroy'
    post '/subscription/show', to: 'subscriptions#show'
    get '/subscriptions/:user_id/channel', to: 'subscriptions#users_subscriptions'
    
    # playlist routes
    resources :playlists, only: [:index, :show, :create, :update, :destroy]
    
    resources :likes, only: [:create, :update, :destroy]
    resources :comments,  only: [:create, :update, :destroy]
    # resources :comments,  except: [:new, :edit]
    
  end

end
