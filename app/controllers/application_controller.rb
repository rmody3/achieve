class ApplicationController < ActionController::Base
  helper_method :current_user, :authorized_user?, :authenticate_user!, :user_signed_in?, :bootstrap_data
  protect_from_forgery with: :null_session
  respond_to :json

  def current_user
    current_teacher || current_student
  end

  def current_user_type
    current_user.class.name.downcase()
  end

  def authorized_user?
    @user == current_user
  end


  def authenticate_user!
    return if current_user

    redirect_to home_index_path
  end

  def after_sign_out_path_for(*)
    redirect_to home_index_path
  end

  def user_signed_in?
    teacher_signed_in? || student_signed_in?
  end

  def bootstrap_data
    {
      logged_in: user_signed_in?,
      user: current_user,
      user_type: current_user_type
    }
  end

#   def set_csrf_cookie_for_ng
#     cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
#   end

# protected
#   def verified_request?
#     super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
#   end
end
