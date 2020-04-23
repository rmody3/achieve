class AddTimestampsToGoals < ActiveRecord::Migration[6.0]
  def change
    add_column :goals, :updated_at, :timestamp, precision: 6, null: false, default: Time.now
    add_column :goals, :created_at, :timestamp, precision: 6, null: false, default: Time.now
  end
end
