class Reward < ApplicationRecord
  belongs_to :classroom

  validates_presence_of :description
  validates_presence_of :achievement_points
end
