class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :authenticate

  def authenticate
    unless user
      redirect_to login_url
    end
  end

  def user
    session[:id]
  end
end
