class CreateBadges < ActiveRecord::Migration[6.0]
  def change
    create_table :badges do |t|
      t.references :student
      t.string :kind
      t.timestamps
    end
  end
end
