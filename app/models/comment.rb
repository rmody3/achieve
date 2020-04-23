class Comment < ApplicationRecord
  belongs_to :goal
  belongs_to :author, polymorphic: true

  validates_presence_of :body

  default_scope { order(id: :asc) }
end