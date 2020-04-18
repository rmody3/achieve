class Api::StudentsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_teacher!, only: [:show]

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

  def strong_params
    params.permit(:id, :name)
  end
end