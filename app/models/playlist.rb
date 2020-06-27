class Playlist < ApplicationRecord
    validates :user_id, :name, presence: true
    
    belongs_to :user,
        foreign_key: :user_id
    
    has_many :videos
end 