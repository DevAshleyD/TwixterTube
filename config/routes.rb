Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do

    # user routes
    resources :users, only: [:create, :show, :update, :destroy]

    resource :session, only: [:create, :destroy]

    # resources :videos, only: [:create, :update, :destroy, :index, :show]
    resources :videos, except: [:new, :edit]
    patch '/videos/:id/views', to: 'videos#view_update'
    get '/videos/content_creator/:author_id', to: 'videos#content_creator_vids'

    # subscription routes
    resources :subscriptions, only: [:create, :index]
    post '/subscriptions/delete', to: 'subscriptions#destroy'
    post '/subscription/show', to: 'subscriptions#show'

    # playlist routes
    resources :playlists, only: [:index, :show, :create, :update, :destroy]

    resources :likes, only: [:create, :update, :destroy]
    resources :comments,  only: [:create, :update, :destroy]
    # resources :comments,  except: [:new, :edit]

  end

end
