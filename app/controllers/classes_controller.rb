class ClassesController < ApplicationController
  before_action :authenicate_user!

  def index
    render json: current_user.class.to_json
  end

  def create
  end

  def destroy
    #TO DO
  end

  def show
    #TO DO
  end

  def update
  end
end