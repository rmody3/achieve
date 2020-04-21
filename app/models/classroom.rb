class Classroom < ApplicationRecord
  belongs_to :teacher
  has_many :class_participants
  has_many :students, through: :class_participants
  has_many :rewards

  validates_presence_of :name
end
