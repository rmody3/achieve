class Badge < ApplicationRecord
  belongs_to :student

  TYPES = {
    first_goal_created: {description: 'first goal created', file: 'first_goal_created'},
    first_goal_approved: {description: 'first goal achieved', file: 'first_goal_approved'},
    third_goal_created: {description: 'third goal created', file: 'third_goal_created'},
    third_goal_approved: {description: 'third goal achieved', file: 'third_goal_approved'},
    ambitious: {description: 'two goals created in one day', file:'ambitious' }
  }

  validates_inclusion_of :kind, in: TYPES.keys.map(&:to_s), on: :create, message: "badge type %s is not supported"
end