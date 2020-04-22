class AddAchievementPointsToGoals < ActiveRecord::Migration[6.0]
  def change
    add_column :goals, :achievement_points, :integer
  end
end
