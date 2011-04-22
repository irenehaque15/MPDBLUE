module ApplicationHelper

	def current_class?(test_path)
		if request.fullpath == test_path
			return 'active active-trail'
		elsif request.fullpath.include?(test_path)
			return 'active-trail'
		else
			return ''
		end
	end

	def mng_user?
		return 'true' if request.fullpath.include?("/admin/users")
		'false'
	end
	def mng_port?
		return 'true' if request.fullpath.include?("/admin/portfolios")
		'false'
	end

	def home?
		return 'active' if request.fullpath == "/"
		''
	end

	def user?
		return 'true' if session[:id]
		'false'
	end

	def team?
		return 'true' if session[:user_type] == "team"
		'false'
	end

	def admin?
		return 'true' if session[:user_type] == "admin"
		'false'
	end

	def withsecondary?
		if user? == "false"
			return ''
		elsif home? == 'active'
			return ''
		elsif mng_user? == "true"
			if team? == "true"
				return ''
			elsif admin? == "true" 
				return 'withsecondary'
			end
		else
			return "withsecondary"
		end
	end

	def type
		return session[:user_type]
	end

	def name
		if type == "admin"
			return Admin.find(session[:id]).name
		elsif type =="team"
		       return Team.find(session[:id]).name
		end
	end
end
