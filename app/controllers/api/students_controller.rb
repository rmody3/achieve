class Api::StudentsController < ApplicationController
  before_action :authenticate_user!

  def index
    response = {
      id: current_student.email,
      email: current_student.email,
      level: current_student.level,
      points_total: current_student.points_total,
      points_remaining: current_student.points_remaining,
      badges: 'a badge'
    }

    render json: response.to_json 
  end

  def create
  end

  def destroy
    #TO DO
  end

  def show
    render json
  end

  def update
  end

  def strong_params
    params.permit(:id, :name)
  end
end