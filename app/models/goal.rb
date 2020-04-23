class Goal < ApplicationRecord
    belongs_to :class_participant
    has_many :comments
end