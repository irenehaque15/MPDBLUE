class UserMailer < ActionMailer::Base

  def notify_admin(admin, portfolio)
	  recipients "\"#{admin.name}\" <#{admin.email}>"
	  from "\"MPD Gallery\" <#{admin.email}>"
	  subject "[MPD Gallery] Action Required"
	  sent_on Time.now
	  body :portfolio => portfolio
  end

end
