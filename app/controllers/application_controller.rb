class ApplicationController < ActionController::Base
    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

    def login!
        session[:user_id] = @user.id
    end
    
    def logged_in?
        !!session[:user_id]
    end
    
    def current_user
        student = Student.find(session[:user_id]) if session[:user_id]
        teacher = Teacher.find(session[:user_id]) if session[:user_id]

        @current_user ||= (student || teacher)
    end

    def authorized_user?
         @user == current_user
    end
    
    def logout!
         session.clear
    end
end
