Rails.application.routes.draw do
  devise_for :teachers, path: 'teachers', controllers: { registrations: 'registrations', sessions: 'sessions' }
  devise_for :students, path: 'students', controllers: { registrations: 'registrations', sessions: 'sessions' }
  
  root 'home#index'
  get 'home/index'
end
