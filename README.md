**Why**

For some reason, we need to use SendGrid V3 in SailJS &lt; 1.0.x

# nodemailer-sendgrid-transport

This module is a transport plugin for [Nodemailer](https://github.com/andris9/Nodemailer) that makes it possible to send through [SendGrid's V3 Web API](https://sendgrid.com/docs/api-reference/)!

[![npm version](https://badge.fury.io/js/%40danfebooks%2Fnodemailer-sendgrid-transport.svg)](https://badge.fury.io/js/%40danfebooks%2Fnodemailer-sendgrid-transport)

## Usage
Install via npm.

	npm install -S -E @danfebooks/nodemailer-sendgrid-transport

Require the module and initialize it with your SendGrid credentials.

**Recommended** to use with [@danfebooks/sails-service-mailer](https://github.com/danfebooks/sails-service-mailer)

```javascript
var nodemailer = require('nodemailer');
var sgTransport = require('@danfebooks/nodemailer-sendgrid-transport');

// api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
var options = {
	auth: {
		api_key: 'SENDGRID_APIKEY'
	}
}
	
var mailer = nodemailer.createTransport(sgTransport(options));
```

Note: serve the API KEY using environment variables. 

Create an email and send it off!

```javascript
var email = {
	to: ['joe@foo.com', 'mike@bar.com'],
	from: 'roger@tacos.com',
	subject: 'Hi there',
	text: 'Awesome sauce',
	html: '<b>Awesome sauce</b>',
	categories: ['Welcome Email', 'Receipt Email']
};

mailer.sendMail(email, function(err, res) {
	if (err) { 
		console.log(err) 
	}
	console.log(res);
});
```
## Need help?
Please file an issue.
