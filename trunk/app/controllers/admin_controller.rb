class AdminController < ApplicationController

	def index
		@id = session[:id]
		@type = session[:user_type]
		if @type == 'admin'
			@user = Admin.find(session[:id])
		elsif @type == 'team'
			@user = Team.find(session[:id])
			@portfolio = Portfolio.find(@user)
		end	   
	end
	def users
		@id = session[:id]
		@type = session[:user_type]
		if @type == 'admin'
			@students = Student.order("lastname ASC")
			@admins = Admin.all
		elsif @type == 'team'
			@students = Student.order("lastname ASC").find_all_by_team_id(@id)
		end

	end
	def portfolios
		@id = session[:id]
		@type = session[:user_type]
		if @type == 'admin'
			@user = Admin.find(session[:id])
			@pending = Portfolio.where("status = ?", "pending")
			@approved = Portfolio.where("status = ?", "approved")
			@open = Portfolio.where("status = ?", "open")

		elsif @type == 'team'
			@user = Team.find(session[:id])
			@open = Portfolio.where("team_id = ? AND status = ?", session[:id], "open")
			@pending = Portfolio.where("team_id = ? AND status = ?", session[:id], "pending")
			@approved = Portfolio.where("team_id = ? AND status = ?", session[:id], "approved")
		end
	end

	def edit_status
		@portfolio = Portfolio.find(params[:id])
		render :layout => false
	end

	def new_team
		@new_team = Team.new
	end

	def update
		@admin = Admin.find(params[:id])
		if params[:admin][:email]
			@admin.email = params[:admin][:email]
		end
		@admin.save
		redirect_to  "/admin/users"
	end
	def edit_portfolio
		@portfolio = Portfolio.find(params[:id])
		session[:portfolio_id] = @portfolio.id
	end

	def upload_csv
	end

	def new_student
		@new_student = Student.new
	end

	def new_portfolio_team
		@new_portfolio = Portfolio.new
	end
	def new_portfolio_admin
		@new_portfolio = Portfolio.new
	end
end
