class RenameDescrptionOnGoals < ActiveRecord::Migration[6.0]
  def change
    rename_column :goals, :descrption, :description
  end
end
