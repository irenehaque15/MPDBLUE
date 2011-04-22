class CreateStudents < ActiveRecord::Migration
  def self.up
    create_table :students do |t|
      t.string :email
      t.string :lastname
      t.string :firstname

      t.references :team
      t.timestamps
    end
  end

  def self.down
    drop_table :students
  end
end
