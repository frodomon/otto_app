class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :userName
    devise_parameter_sanitizer.for(:sign_up) << :title
    devise_parameter_sanitizer.for(:sign_up) << :name
    devise_parameter_sanitizer.for(:sign_up) << :lastName
    devise_parameter_sanitizer.for(:sign_up) << :genre
    devise_parameter_sanitizer.for(:sign_up) << :phone
    devise_parameter_sanitizer.for(:sign_up) << :mobile
    devise_parameter_sanitizer.for(:sign_up) << :birthDate
    devise_parameter_sanitizer.for(:sign_up) << :ubigeo_id
  end
end
