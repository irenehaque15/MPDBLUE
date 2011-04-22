class Portfolio < ActiveRecord::Base
	belongs_to :team
	has_many :images
	has_many :documents
end
