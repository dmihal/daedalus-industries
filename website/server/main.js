import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import './collections';
import './methods';
import './migrations';
import './publications';

Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        loginStyle: "popup",
        clientId: Meteor.settings.github.clientId,
        secret: Meteor.settings.github.secret,
      }
    }
  );
});
