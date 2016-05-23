class CreateUbigeos < ActiveRecord::Migration
  def change
    create_table :ubigeos do |t|
      t.integer :ubigeo_id
      t.string :name
      t.integer :parent_id

      t.timestamps
    end
  end
end
