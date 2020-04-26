class Api::RewardsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_student!, only: [:claim, :claimed]

  def index
    rewards = current_user.rewards

    if current_user_type == 'student'
      class_participants = ClassParticipant.where(student: current_student)
      achieved_rewards = AchievedReward.where(class_participant: class_participants.pluck(:id))
      rewards = rewards.where.not(id: achieved_rewards.pluck(:reward_id))
    end

    response = rewards.map do |r|
      {
        id: r.id,
        description: r.description,
        classroom: r.classroom.name,
        achievement_points: r.achievement_points
      }
    end

    render json: response.to_json
  end

  def claimed 
    class_participants = ClassParticipant.where(student: current_student)
    achieved_rewards = AchievedReward.where(class_participant_id: class_participants.pluck(:id))

    response = achieved_rewards.map do |r|
      {
        id: r.reward.id,
        description: r.reward.description,
        classroom: r.reward.classroom.name,
        achievement_points: r.reward.achievement_points
      }
    end

    render json: response.to_json
  end

  def create
    reward = Reward.new(classroom_id: params[:classId], description: params[:description], achievement_points: params[:achievementPoints])
    if reward.save
      render json: {reward: reward}
    else
      render json: {errors: reward.errors.to_json}
    end
  end

  def destroy
    #TO DO
  end

  def show
    reward = Reward.find_by_id(params[:id])
    
    if reward
      render json: {
        reward: reward
      }
    else
      render json: {errors: 'cannot find reward'}
    end
  end

  def update
  end

  def claim
    reward = Reward.find(params[:id])
    class_participant = ClassParticipant.find_by(student: current_student, classroom: reward.classroom)
    achieved_reward = AchievedReward.new(class_participant: class_participant, reward: reward)

    begin
      achieved_reward.save
      service = ::AchievementPointsService.spend(class_participant.student, reward.achievement_points)
      if service.success
        render json: achieved_reward.to_json
      else
        render json: service.data
      end
    rescue ActiveRecord::RecordNotUnique => error
      render json: {errors: error.to_json}
    end
  end

  def strong_params
    params.permit(:id, :classId, :description, :achievementPoints)
  end
end