Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 	'tasks', to: 'tasks#index'
      post 	'tasks', to: 'tasks#create_page'
    end
  end
end
