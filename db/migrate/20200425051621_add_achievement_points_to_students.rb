class AddAchievementPointsToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :points_total, :integer, default: 0
    add_column :students, :points_remaining, :integer, default: 0
  end
end
