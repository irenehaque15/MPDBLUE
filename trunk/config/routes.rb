Trunk::Application.routes.draw do |map|
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'

  resources :home
  resources :logins
  resources :portfolios
  resources :images
  resources :documents
  resources :s3_uploads
  resources :teams do
  end
  resources :students do
	  collection do
		  get 'upload'
	  end
  end
  resources :admin do
	  collection do
		  get 'update_portfolio'
	  end
	  collection do
		  get 'portfolios'
	  end
	  collection do
		  get 'users'
	  end
	  collection do
		  get 'new_portfolio_admin'
	  end
	  collection do 
		  get 'new_portfolio_team'
	  end
	  collection do
		  get 'new_team'
	  end
  end

  match 'students/new/:id' => 'students#new'
  match 'students/delete/:id' => 'students#delete'
  match 'images/delete/:id' => 'images#delete'
  match 'students/edit_email/:id' => 'students#edit_email'
  match 'documents/delete/:id' => 'documents#delete'
  match 'students/edit_admin_email/:id' => 'students#edit_admin_email'
  match 'students/edit_team/:id' => 'students#edit_team'
  match 'admin/edit_status/:id' => 'admin#edit_status'
  match 'admin/edit_portfolio/:id' => 'admin#edit_portfolio'
  match 'admin/portfolios/new_portfolio_admin' => 'admin#new_portfolio_admin'
  match 'admin/portfolios/new_portfolio_team' => 'admin#new_portfolio_team'
  match 'admin/users/new_team' => 'admin#new_team'
  match 'admin/users/new_student' => 'admin#new_student'
  match 'admin/users/upload_csv' => 'admin#upload_csv'

map.logout 'logout', :controller => 'logins', :action => 'logout'
map.login 'login', :controller => 'logins', :action => 'login'

map.users 'admin/users', :controller => 'admin', :action => 'users'
map.portfolios 'admin/portfolios', :controller => 'admin', :action => 'portfolios'
map.portfolios 'admin/portfolios', :controller => 'admin', :action => 'portfolios'
map.admin 'admin', :controller => 'admin', :action => 'index'
map.csv 'admin/csv', :controller => 'students', :action => 'csv_import'


root :to => 'home#index'

end
