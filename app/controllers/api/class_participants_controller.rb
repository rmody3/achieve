class Api::ClassParticipantsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_student!, only: [:create]

  def index
    participants = current_student.class_participants.includes(:classroom).map do |c| 
      {
        participantId: c.id,
        classroom: c.classroom
      } 
    end

    if participants
      render json: participants.to_json
    else
      render json: {errors: participants.errors.to_json}
    end
  end

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
    class_participant = ClassParticipant.find(params[:id])

    render json: {
      goals: class_participant&.goals,
      classroom: class_participant.classroom,
      student_info: {
        id: class_participant.student.email,
        email: class_participant.student.email,
        level: class_participant.student.level,
        points_total: class_participant.student.points_total,
        points_remaining: class_participant.student.points_remaining,
        badges: ::BadgeService.get(class_participant.student)
      }
    }.to_json
  end

  def destroy
    #TO DO
  end

  def strong_params
    params.permit(:id, :joinCode)
  end
end