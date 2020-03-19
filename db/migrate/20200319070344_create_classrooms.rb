class CreateClassrooms < ActiveRecord::Migration[6.0]
  def change
    create_table :classrooms do |t|
      t.references :teacher, foreign_key: true
      t.string :name
      t.string :join_code
      t.boolean :archived, default: false
      t.timestamps
    end
  end
end
