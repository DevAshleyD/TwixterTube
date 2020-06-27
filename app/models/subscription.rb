class Subscription < ApplicationRecord
    # validates :content_creator_id, :subscriber_id, presence: true

    belongs_to :content_creator,
        foreign_key: :content_creator_id,
        class_name: :User

    belongs_to :subscriber,
        foreign_key: :subscriber_id,
        class_name: :User
end
