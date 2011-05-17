require 'test_helper'
 
class ImageTest < ActiveSupport::TestCase
  test "should only upload an image with a unique name" do
      image1 = Image.create(:name => 'FileName')
      assert !Image.create(:name => 'FileName'), "Uploaded images with duplicate names"
  end
end
