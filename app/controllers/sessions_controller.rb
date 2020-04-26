class SessionsController < Devise::SessionsController
  # after_filter :set_csrf_headers, only: [:create, :destroy]
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

  def destroy # Assumes only JSON requests
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render :json => {
        'csrfParam' => request_forgery_protection_token,
        'csrfToken' => form_authenticity_token
    }
  end

  protected
  
  # def set_csrf_headers
  #   cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?  
  # end

  # def verify_user
  #   ## redirect to appropriate path
  #   redirect_to home_indpex_path, notice: 'You have already signed out. Please sign in again.' and return unless user_signed_in?
  # end
end