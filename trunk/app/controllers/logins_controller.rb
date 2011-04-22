class LoginsController < ApplicationController

  skip_before_filter :authenticate

  def login
    if session[:id] 
       redirect_to :controller => 'admin'
    end
    if request.post?
       if session[:id] = Team.select("id").where("name = ? and password = ?", params[:user][:name], params[:user][:password]).first
            session[:user_type] = "team"
            redirect_to "/admin/portfolios"
       elsif session[:id] = Admin.select("id").where("name = ?", params[:user][:name]).first
            session[:user_type] = "admin"
            redirect_to "/admin/portfolios"
       else
            flash[:message] = "Login Failed.  "
       end
    end
  end

  def logout
    session[:id] = nil
    session[:user_type] = nil
    reset_session
    flash[:message] = "You are logged out.  "
    redirect_to "/"
  end

end
