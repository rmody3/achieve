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

  resources :classrooms
end
