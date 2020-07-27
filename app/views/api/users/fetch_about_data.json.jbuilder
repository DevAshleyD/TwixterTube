json.partial! 'api/users/user', user: @user
json.about @user.about
json.subscriber_count @user.number_of_subscribers
json.joined @user.created_at.strftime("%b %d, %Y")