class User < ApplicationRecord

    validates :username, :email, :session_token, :password_digest, presence: true
    validates :username, :email, :session_token, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    after_initialize :ensure_session_token

    has_many :videos,
        foreign_key: :uploader_id,
        class_name: :Video,
        dependent: :destroy

    has_many :likes, 
        dependent: :destroy,
        foreign_key: :user_id,
        class_name: :Like

    has_many :comments,
        foreign_key: :user_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :playlists,
        dependent: :destroy,
        foreign_key: :user_id

    has_one_attached :channel_banner

    has_one_attached :profile_pic
    
    # ˇˇˇˇ Subscription based associations ˇˇˇˇ

    has_many :subscriber_subscriptions,
        foreign_key: :content_creator_id,
        class_name: :Subscription

    has_many :subscribers,
        through: :subscriber_subscriptions,
        source: :subscriber

    has_many :creator_subscriptions,
        foreign_key: :subscriber_id,
        class_name: :Subscription

    has_many :subscriptions,
        through: :creator_subscriptions,
        source: :content_creator

    # ^^^^ Subscription based associations ^^^^

    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def number_of_subscribers
        return self.subscribers.length
    end

    def number_of_subscriptions
        return self.subscriptions.length
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_unique_session_token
        save!
        self.session_token
    end

    private

    def ensure_session_token
        generate_unique_session_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64
    end

    def generate_unique_session_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
        self.session_token = new_session_token
        end
        self.session_token
    end

end
