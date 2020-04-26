class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  has_many :class_participants
  has_many :classrooms, through: :class_participants
  has_many :goals, through: :class_participants
  has_many :rewards, through: :classrooms
  has_many :achieved_rewards, through: :class_participants

  def level
    (0.089*(points_total**0.694)).floor
  end
end
