class CreateRewards < ActiveRecord::Migration[6.0]
  def change
    create_table :rewards do |t|
      t.references :classroom, foreign_key: true
      t.text :description, null: false
      t.integer :achievement_points, null: false
      t.timestamps
    end
  end
end
