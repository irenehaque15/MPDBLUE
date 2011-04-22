class TeamsController < ApplicationController

	
	

	def create
		@team = Team.new
		@team.name = params[:team][:name]
		@team.password = params[:team][:name]
		@team.save

		redirect_to '/admin/users'
	end
	def edit
		@team = Team.find(params[:id])
		@new_student = Student.new
	end
end
