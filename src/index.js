'use strict';

var packageData = require('../package.json');
var sendgrid = require('@sendgrid/mail');

module.exports = function(options) {
  return new SendGridTransport(options);
};

function SendGridTransport(options) {
  options = options || {};

  this.options = options;
  this.name = 'SendGrid';
  this.version = packageData.version;

  this.sendgrid = sendgrid.setApiKey(this.options.auth.api_key);
}

SendGridTransport.prototype.send = function(mail, callback) {
  // fetch envelope data from the message object
  var subject = mail.data.subject || '';
  var addresses = mail.message.getAddresses();
  var from = [].concat(addresses.from || addresses.sender || addresses['reply-to'] || []).shift();
  var to = [].concat(addresses.to || []);
  var cc = [].concat(addresses.cc || []);
  var bcc = [].concat(addresses.bcc || []);
  var categories = [].concat(mail.data.categories || []);

  var email = {
    personalizations: [],
    content: [],
    from: {}
  };

  // populate from and fromname
  if (from) {
    if (from.address) {
      email.from.email = from.address;
    }

    if (from.name) {
      email.from.name = from.name;
    }
  }

  // populate to and toname arrays
  if (to && Array.isArray(to) && to.length > 0) {
    var recipients = {
      to: to.map(function(rcpt) {
        return {
          email: rcpt.address || '',
          name: rcpt.name || ''
        }
      }),
      subject: subject
    }

    // populate cc arrays
    if (cc && Array.isArray(cc) && cc.length > 0) {
      var ccs = cc.map(function(rcpt) {
        if (typeof rcpt === "string") return {
          email: rcpt
        };
        return {
          email: rcpt.address || '',
          name: rcpt.name || ''
        };
      });
      recipients.cc = ccs;
    }

    // populate bcc arrays
    if (bcc && Array.isArray(bcc) && bcc.length > 0) {
      var bccs = bcc.map(function(rcpt) {
        if (typeof rcpt === "string") return {
          email: rcpt
        };
        return {
          email: rcpt.address || '',
          name: rcpt.name || ''
        };
      });
      recipients.bcc = bccs;
    }

    email.personalizations.push(recipients);
  }

  // populate categories
  if (categories && Array.isArray(categories) && categories.length > 0) {
    email.categories = categories;
  }

  // populate plain text content
  if (mail.data.text) {
    email.content.push({
      value: mail.data.text,
      type: 'text/plain'
    });
  }

  // populate html content
  if (mail.data.html) {
    email.content.push({
      value: mail.data.html,
      type: 'text/html'
    });
  }

  this.sendgrid.send(email, callback);
};
