class CreatePortfolios < ActiveRecord::Migration
  def self.up
    create_table :portfolios do |t|
      t.string :name
      t.string :status
      t.string :contact_link

      t.references :team

      t.timestamps
    end
  end

  def self.down
    drop_table :portfolios
  end
end
