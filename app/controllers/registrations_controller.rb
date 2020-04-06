class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    #https://www.natashatherobot.com/devise-sign-up-ajax-rails/
    def create
      build_resource sign_up_params
      
      if resource.save
          if resource.active_for_authentication?
          set_flash_message :error, :signed_up if is_navigational_format?
          sign_up(resource_name, resource)
          return render :json => {:logged_in => true, user: current_user.to_json}
          else
          set_flash_message :error, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
          expire_session_data_after_sign_in!
          return render :json => {:logged_in => true, user: current_user.to_json}
          end
      else
        clean_up_passwords resource
        return render :json => {:logged_in => false, errors: resource.errors}
      end
    end

        # Signs in a user on sign up. You can overwrite this method in your own
    # RegistrationsController.
    def sign_up(resource_name, resource)
      sign_in(resource_name, resource)
    end

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end