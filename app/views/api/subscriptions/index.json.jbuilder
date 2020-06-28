json.subscriptions @subscriptions do |sub|
    json.id sub.id
    json.content_creator_id sub.content_creator_id
    json.subscriber_id sub.subscriber_id
end
