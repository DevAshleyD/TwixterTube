class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :content_creator_id, null: false
      t.integer :subscriber_id, null: false

      t.timestamps
    end
  end
end
