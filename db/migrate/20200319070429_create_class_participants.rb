class CreateClassParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :class_participants do |t|
      t.references :classroom, foreign_key: true
      t.references :student, foreign_key: true
    end
  end
end
