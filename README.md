**Why**

For some reason, we need to use SendGrid V3 in SailJS &lt; 1.0.x

# nodemailer-sendgrid-transport

This module is a transport plugin for [Nodemailer](https://github.com/andris9/Nodemailer) that makes it possible to send through [SendGrid's V3 Web API](https://sendgrid.com/docs/api-reference/)!

## Usage
Install via npm.

	npm install @danfebooks/nodemailer-sendgrid-transport

Require the module and initialize it with your SendGrid credentials.

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

Note: We suggest storing your SendGrid username and password as enviroment variables.

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

## Deploying

* Confirm tests pass
* Bump the version in `package.json`, `test/index.test.js`
* Update `CHANGELOG.md`
* Confirm tests pass
* Commit `Version bump vX.X.X`
* `npm publish`
* Push changes to GitHub
* Release tag on GitHub `vX.X.X`

## License
Licensed under the MIT License.
