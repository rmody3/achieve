class Goal < ApplicationRecord
  belongs_to :class_participant
  has_many :comments
  delegate :student, :to => :class_participant

  def accomplished?
    !!accomplished_date
  end

  def approved?
    !!approved_date
  end
end