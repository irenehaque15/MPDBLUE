class HomeController < ApplicationController

  skip_before_filter :authenticate

  def index
    @approved = Portfolio.where("status = ?", "approved").order("updated_at DESC")
  end

  def list
    end
end
