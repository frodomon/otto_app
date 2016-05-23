class Ubigeo < ActiveRecord::Base
	belongs_to :user
	self.primary_key = 'ubigeo_id'
end
