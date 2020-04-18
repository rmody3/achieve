class SessionsController < Devise::SessionsController
  # prepend_before_filter :verify_user, only: [:destroy]

  respond_to :json

  def new
    super
  end

  def create
    super do |user|
      if user
        return render json: {logged_in: true, user: user.to_json, user_type: user.class&.name.downcase()}
      else
        return render json: {logged_in: false, errors: user.errors.to_json}
      end
    end
  end

  def destroy
    super
  end

  # def verify_user
  #   ## redirect to appropriate path
  #   redirect_to home_indpex_path, notice: 'You have already signed out. Please sign in again.' and return unless user_signed_in?
  # end
end