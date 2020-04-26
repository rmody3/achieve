class ClassParticipant < ApplicationRecord
    belongs_to :student
    belongs_to :classroom
    has_many :goals
    has_many :comments, as: :author
    has_many :achieved_rewards
end