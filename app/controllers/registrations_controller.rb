class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def new
        super
    end

    def create
        super
    end    

    def sign_up_params
        params.permit(:email, :password, :password_confirmation)
    end
end