class ClassParticipant < ApplicationRecord
    belongs_to :student
    belongs_to :classroom
    has_many :goals
end