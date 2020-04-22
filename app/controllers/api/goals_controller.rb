class Api::GoalsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_student!, only: [:create, :destroy]

  def index
    goals = current_user.goals
    .joins(:class_participant => :classroom)
    .select('goals.id, goals.title, goals.description, goals.due_date, goals.achievement_points, classrooms.name as classroom_name')
    .order(updated_at: :desc)

    render json: goals.to_json
  end

  def create
    participant = ClassParticipant.where(student_id: current_student.id, classroom_id: params[:classId])

    unless participant
      return render json: {errors: 'participant not found'}
    end

    goal = Goal.new(
      class_participant_id: participant.first.id, 
      title: params[:title], 
      description: params[:description], 
      due_date: params[:dueDate],
      achievement_points: params[:achievementPoints])

    if goal.save
      render json: {goal: goal}
    else
      render json: {errors: reward.errors.to_json}
    end
  end

  def destroy
    #TO DO
  end

  def show
    reward = Goal.find_by_id(params[:id])
    
    if reward
      render json: {
        reward: reward
      }
    else
      render json: {errors: 'cannot find goal'}
    end
  end

  def update
  end

  def strong_params
    params.permit(:id, :classId, :title, :description, :achievementPoints, :dueDate)
  end
end