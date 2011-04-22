# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
#

# Creating the teams
    blue = Team.create( :name => 'blue', :password => 'blue' )
    green = Team.create( :name => 'green', :password => 'green' )
    orange = Team.create( :name => 'orange', :password => 'orange' )
    purple = Team.create( :name => 'purple', :password => 'purple' )
    red = Team.create( :name => 'red', :password => 'red' )
    yellow = Team.create( :name => 'yellow', :password => 'yellow' )

# Creating the a portfolio for each team
    p_blue = Portfolio.create(:name => 'p_blue', :team_id => blue.id, :status => 'approved')
    p_green = Portfolio.create(:name => 'p_green', :team_id => green.id, :status => 'approved')
    p_orange = Portfolio.create(:name => 'p_orange', :team_id => orange.id, :status => 'approved')
    p_purple = Portfolio.create(:name => 'p_purple', :team_id => purple.id, :status => 'open')
    p_red = Portfolio.create(:name => 'p_red', :team_id => red.id, :status => 'open')
    p_yellow = Portfolio.create(:name => 'p_yellow', :team_id => yellow.id, :status => 'pending')

# Creating the admin
    Admin.create(:name => 'admin', :password => 'admin')

# Creating the images for each of the portfolios


# Creating documents for each of the portfolios
    Document.create(:name => 'doc1.pdf', :portfolio_id => p_blue.id, :path => '/portfolios/' + p_blue.id.to_s + '/docs/')

    Document.create(:name => 'doc1.pdf', :portfolio_id => p_green.id, :path => '/portfolios/' + p_blue.id.to_s + '/docs/')

    Document.create(:name => 'doc1.pdf', :portfolio_id => p_orange.id, :path => '/portfolios/' + p_blue.id.to_s + '/docs/')

    Document.create(:name => 'doc1.pdf', :portfolio_id => p_purple.id, :path => '/portfolios/' + p_blue.id.to_s + '/docs/')
    
    Document.create(:name => 'doc1.pdf', :portfolio_id => p_red.id, :path => '/portfolios/' + p_blue.id.to_s + '/docs/')

    Document.create(:name => 'doc1.pdf', :portfolio_id => p_yellow.id, :path => '/portfolios/' + p_blue.id.to_s + '/docs/')
