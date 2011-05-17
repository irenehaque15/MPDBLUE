require 'test_helper'
 
class ImageTest < ActiveSupport::TestCase
  test "should only upload an image with a unique name" do
      image1 = Image.create(:name => 'FileName')
      image2 = Image.new
      image2.name = 'FileName'
      assert !image2.save, "Uploaded images with duplicate names"
  end
end
