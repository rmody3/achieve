class Api::ClassroomsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.classrooms.to_json
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