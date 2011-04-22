class StudentsController < ApplicationController
	require 'csv'

	def edit_email
		@student = Student.find(params[:id])
	end

	def edit_admin_email
		@admin = Admin.find(params[:id])
	end
	def edit_team
		@student = Student.find(params[:id])
	end

	def show
		@students = Student.find_all_by_team_id(params[:id])
	end

	def new
		@new_student = Student.new
	end

	def edit
		@student = Student.find(params[:id])
	end

	def delete
		@student = Student.find(params[:id])
	end
	def create
		@student = Student.new
		@student.firstname = params[:student][:firstname]
		@student.lastname = params[:student][:lastname]
		@student.email = params[:student][:email]
		@student.team_id = params[:student][:team_id]
		@student.save

		redirect_to "/admin/users"
	end

	def update
		@student = Student.find(params[:id])
		@old_team = @student.team_id
		
		if params[:student][:email]
			@student.email = params[:student][:email]
		end
		if params[:student][:team_id]
			@student.team_id = params[:student][:team_id]
		end
		@student.save
		redirect_to "/admin/users"
	end

	def destroy
		Student.destroy(params[:id])

		redirect_to "/admin/users"
	end

	def csv_import

		@file = CSV::Reader.parse(params[:dump][:file])

		@file.each do |row|
			if @team = Team.find_by_name(row[3])
			else
				@team = Team.new
				@team.name = row[3]
				@team.password = row[3]
				@team.save

				@portfolio = Portfolio.new
				@portfolio.team_id = @team.id
				@portfolio.name = @team.name
				@portfolio.status = "open"
				@portfolio.save
			end
			st=Student.new
			st.firstname=row[0]
			st.lastname=row[1]
			st.email=row[2]
			st.team_id=@team.id
			st.save
		end

		redirect_to '/admin/users'
	end

	def upload
	end
end
