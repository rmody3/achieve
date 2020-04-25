class Goal < ApplicationRecord
  belongs_to :class_participant
  has_many :comments

  def accomplished?
    !!accomplished_date
  end

  def approved?
    !!approved_date
  end
end