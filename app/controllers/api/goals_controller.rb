class Api::GoalsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_student!, only: [:create, :destroy]

  def index
    if current_user_type == 'student'
      goals = current_student.goals
        .joins(:class_participant => :classroom)
        .select('goals.id, goals.title, goals.description, goals.due_date, goals.achievement_points, goals.approved_date, classrooms.name as classroom_name')
        .order('goals.updated_at': :desc)  
    else
      goals = current_teacher.classrooms
        .joins(class_participants: [:goals, :student])
        .select('goals.id, goals.title, goals.description, goals.due_date, goals.achievement_points, goals.approved_date, students.email, classrooms.name as classroom_name')
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
    goal = Goal.find(params[:id])
    goal.assign_attributes(
      achievement_points: params[:achievementPoints] || goal.achievement_points,
      due_date: params[:dueDate] || goal.due_date,
      approved_date: (params[:approvedDate] ? Time.at(params[:approvedDate]/1000.0) : goal.approved_date)
    )
    
    if goal.save

      render json: goal.to_json
    else
      render json: {errors: goal.errors.to_json}
    end
  end

  def approve
    goal = Goal.find(params[:id])
    goal.assign_attributes(approved_date: Time.at(params[:approvedDate]/1000.0))
    
    if goal.save && goal.approved?
      student = goal.class_participant.student
      binding.pry
      service = ::AchievementPointsService.add(student, goal.achievement_points)

      if service.success
        render json: goal.to_json
      else
        render json: service.data
      end
    else
      render json: {errors: goal.errors.to_json}
    end
  end

  def strong_params
    params.permit(:id, :classId, :title, :description, :achievementPoints, :dueDate, :approvedDate)
  end
end