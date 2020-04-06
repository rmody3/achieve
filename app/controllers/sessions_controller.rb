class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |user|
      if resource
        return render json: {logged_in: true, user: resource.to_json}
      else
        return render json: {logged_in: false, errors: resource.errors.to_json}
      end
    end
  end

  def destroy
    super
  end
end