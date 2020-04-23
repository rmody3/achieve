class Api::GoalsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_student!, only: [:create, :destroy]

  def index

    if current_user_type == 'student'
      goals = current_student.goals
        .joins(:class_participant => :classroom)
        .select('goals.id, goals.title, goals.description, goals.due_date, goals.achievement_points, classrooms.name as classroom_name')
        .order('goals.updated_at': :desc)  
    else
      goals = current_teacher.classrooms
        .joins(class_participants: [:goals, :student])
        .select('goals.id, goals.title, goals.description, goals.due_date, goals.achievement_points, students.email, classrooms.name as classroom_name')
        .order('goals.updated_at')
        .limit(10)
    end
   
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
    goal = Goal.find_by_id(params[:id])

    unless goal
      return render json: {errors: 'cannot find goal'}
    end

    comments = Comment.includes(:author).where(goal: goal).map do |c| 
      {
        author_type: c.author_type.downcase,
        email: c.author.email,
        body: c.body
      } 
    end
    
    render json: {
      goal: goal,
      comments: comments
    }.to_json
  end

  def update
  end

  def strong_params
    params.permit(:id, :classId, :title, :description, :achievementPoints, :dueDate)
  end
end