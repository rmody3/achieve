class Api::ClassroomsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_teacher!, only: [:create, :destroy]

  def index
    render json: current_user.classrooms.to_json
  end

  def create
    classroom = Classroom.new(teacher: current_user, name: params[:name], join_code: SecureRandom.alphanumeric(10))

    if classroom.save
      render json: {classroom: classroom}
    else
      render json: {errors: classrooms.errors.to_json}
    end
  end

  def destroy
    #TO DO
  end

  def show
    classroom = Classroom.find_by_id(params[:id])
    
    if classroom
      render json: {
        classroom: classroom,
        students: classroom.students
      }
    else
      render json: {errors: classrooms.errors.to_json}
    end
  end

  def update
  end

  def strong_params
    params.permit(:id, :name)
  end
end