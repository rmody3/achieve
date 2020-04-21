class Api::RewardsController < ApplicationController
  before_action :authenticate_user!

  def index
    response = current_user.rewards.map do |r|
      {
        id: r.id,
        description: r.description,
        classroom: r.classroom.name,
        achievement_points: r.achievement_points
      }
    end
    render json: response.to_json
  end

  def create
    reward = Reward.new(classroom_id: params[:classId], description: params[:description], achievement_points: params[:achievementPoints])
    binding.pry
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

  def strong_params
    params.permit(:id, :classId, :description, :achievementPoints)
  end
end