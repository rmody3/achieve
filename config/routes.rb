Rails.application.routes.draw do
  devise_for :teachers, path: 'teachers', controllers: { registrations: 'registrations', sessions: 'sessions' }
  as :teacher do
    get 'login', to: 'home#index'
    get 'signup', to: 'home#index'
  end
  devise_for :students, path: 'students', controllers: { registrations: 'registrations', sessions: 'sessions' }
  as :student do
    get 'login', to: 'home#index'
    get 'signup', to: 'home#index'
  end

  root 'home#index'
  get 'home/index'
  get 'dashboard', to: 'home#index'
  get 'classrooms', to: 'home#index'
  get 'classrooms/new', to: 'home#index'
  get 'classrooms/:id', to: 'home#index'
  get 'rewards', to: 'home#index'
  get 'rewards/new', to: 'home#index'
  get 'rewards/:id', to: 'home#index'
  get 'goals/new', to: 'home#index'
  get 'goals/:id', to: 'home#index'
  get 'participants/:id', to: 'home#index'

  namespace :api do
    resources :classrooms
    resources :rewards do
      post 'claim', on: :member
      get 'claimed', on: :collection
    end
    resources :goals do
      put 'approve', on: :member
    end
    resources :class_participants
    resources :comments
  end
end
