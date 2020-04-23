class Api::ClassParticipantsController < ApplicationController
  before_action :authenticate_student!


  def create 
    classroom = Classroom.find_by(join_code: params[:joinCode])

    unless classroom
      return render json: {errors: 'classroom not found, try another join code'}
    end

    class_participant = ClassParticipant.new(student: current_student, classroom: classroom)

    if class_participant.save
      render json: {class_participant: class_participant}
    else
      render json: {errors: class_participant.errors.to_json}
    end
  end


  def show
    class_participant = ClassParticipant.find_by(student: current_student, classroom_id: params[:id])

    render json: {
      goals: class_participant&.goals,
      classroom: Classroom.find(params[:id])
    }.to_json
  end

  def destroy
    #TO DO
  end

  def strong_params
    params.permit(:id, :joinCode)
  end
end