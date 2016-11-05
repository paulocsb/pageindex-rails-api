class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.string :url
      t.json :content

      t.timestamps
    end
  end
  def undo
  	drop_table :pages
  end
end
