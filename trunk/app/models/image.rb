class Image < ActiveRecord::Base
        validates_uniqueness_of :name
	belongs_to :portfolio
end
