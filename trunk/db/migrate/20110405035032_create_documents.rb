class CreateDocuments < ActiveRecord::Migration
  def self.up
    create_table :documents do |t|
      t.string :name
      t.string :path
      t.string :rank

      t.references :portfolio

      t.timestamps
    end
  end

  def self.down
    drop_table :documents
  end
end
