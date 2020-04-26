class AchievedReward < ApplicationRecord
  belongs_to :class_participant
  belongs_to :reward
end