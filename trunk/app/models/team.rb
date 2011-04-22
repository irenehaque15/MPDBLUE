class Team < ActiveRecord::Base
	has_many :students
	has_many :portfolios
end
