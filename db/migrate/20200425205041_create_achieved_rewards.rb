class CreateAchievedRewards < ActiveRecord::Migration[6.0]
  def change
    create_table :achieved_rewards do |t|
      t.references :class_participant
      t.references :reward
      t.timestamps
    end
  
    add_index :achieved_rewards, [:class_participant_id, :reward_id], unique: true
  end
end
