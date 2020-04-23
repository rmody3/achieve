class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :author, polymorphic: true, index: true
      t.references :goal, index: true
      t.text :body
      t.timestamps
    end
  end
end
