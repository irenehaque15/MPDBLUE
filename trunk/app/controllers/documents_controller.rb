class DocumentsController < ApplicationController
	def new
	end
	def destroy
		@doc = Document.find(params[:id])
		@doc.destroy
		redirect_to "/admin/edit_portfolio/" + session[:portfolio_id].to_s
	end
	def delete
		@document = Document.find(params[:id])
	end
end
