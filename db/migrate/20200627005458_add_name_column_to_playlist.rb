class AddNameColumnToPlaylist < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :name, :string, null: false
  end
end
