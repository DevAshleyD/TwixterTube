class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :content_creator_id, null: false
      t.integer :subscriber_id, null: false

      t.timestamps
    end
    add_index :subscriptions, [:content_creator_id, :subscriber_id], unique: true
  end
end
