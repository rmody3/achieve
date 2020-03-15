Rails.application.routes.draw do
  devise_for :teachers, path: 'teachers'
  devise_for :students, path: 'students'
  
  root 'home#index'
  get 'home/index'
end
