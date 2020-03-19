class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.references :class_participant, foreign_key: true
      t.string :title, null: false
      t.text :descrption, null: false
      t.date :due_date
      t.timestamp :accomplished_date
      t.timestamp :approved_date

      t.index :due_date
    end
  end
end
