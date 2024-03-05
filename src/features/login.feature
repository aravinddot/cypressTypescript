Feature: Login page

	Scenario: Login to the application with valid users
		Given Visit login page
		When Enter the 'validUser' username in username field
		And Enter the 'validUser' password in password field
		And Click on submit button
		Then DashBoard page is visible properly

	Scenario: Login to the application with valid users
		Given Visit login page
		When Enter the 'invalidUser' username in username field
		And Enter the 'invalidUser' password in password field
		And Click on submit button
		Then Verify the 'Invalid credentials' is visible for invalid login

	