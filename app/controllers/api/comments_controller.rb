class Api::CommentsController < ApplicationController
  before_action :authenticate_user!


  def index
    goal = Goal.find(params[:goalId])

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

    render json: {comments: comments}
  end

  def create 
    comment = Comment.new(author: current_user, goal_id: params[:goalId] , body: params[:commentBody])

    if comment.save
      render json: {
        author_type: current_user_type,
        email: current_user.email,
        body: comment.body
      }.to_json
    else
      render json: {errors: comment.errors.to_json}
    end
  end

  def destroy
    #TO DO
  end

  def strong_params
    params.permit(:id, :goalId, :commentBody)
  end
end