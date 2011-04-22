class ImagesController < ApplicationController
	def new
	end

	def update
		@image = Image.find(params[:id])
		if params[:image][:caption]
			@image.caption = params[:image][:caption]
		end
		@image.save
		redirect_to "/admin/edit_portfolio/" + session[:portfolio_id].to_s
	end
	def destroy
		@image = Image.find(params[:id])
		@image.destroy
		redirect_to "/admin/edit_portfolio/" + session[:portfolio_id].to_s
	end

	def delete
		@image = Image.find(params[:id])
	end
end
