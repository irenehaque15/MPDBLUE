class PortfoliosController < ApplicationController

	skip_before_filter :authenticate

	def show
		@portfolio = Portfolio.find(params[:id])
	end

	def create
		@portfolio = Portfolio.new
		@portfolio.name = params[:portfolio][:name]
		if params[:portfolio][:team]
			@portfolio.team_id = params[:portfolio][:team_id]
		else
			@portfolio.team_id = session[:id]
		end
		@portfolio.status = 'open'
		@portfolio.save

		redirect_to '/admin/portfolios'
	end

	def update
		@portfolio = Portfolio.find(params[:id])
		if params[:portfolio]
			@portfolio.contact_link = params[:portfolio][:contact_link]
			@portfolio.name = params[:portfolio][:name]
			@portfolio.save
			redirect_to  '/admin/portfolios'
		end
		if params[:status]
			@admin = Admin.find(1)
			@portfolio.status = params[:status]
			if params[:status] = "pending"
				#PendingMailer.deliver_pending(@admin,@portfolio)
			end
			if params[:status] = "approved"
				@team = @portfolio.team
				@student = @team.students.first
				#ApprovedMailer.deliver_approved(@admin,@portfolio)
			end
			if params[:status] = "open"
				@team = @portfolio.team
				@students = @team.students
				#OpenMailer.deliver_open(@admin,@portfolio)
			end
			@portfolio.save
			redirect_to  '/admin/portfolios'
		end
	end
end

