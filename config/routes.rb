Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]

    # resources :videos, only: [:create, :update, :destroy, :index, :show]
    resources :videos, except: [:new, :edit]
    patch '/videos/:id/views', to: 'videos#view_update'

    # channel related and playlist related http requests
    


    resources :likes, only: [:create, :update, :destroy]
    resources :comments,  only: [:create, :update, :destroy]
    # resources :comments,  except: [:new, :edit]

  end

end
