import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import './collections';
import './methods';
import './migrations';
import './publications';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: Meteor.settings.github.clientId,
        secret: Meteor.settings.github.secret,
      }
    }
  );

  ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
      $set: {
        loginStyle: 'popup',
        consumerKey: Meteor.settings.twitter.consumerKey,
        secret: Meteor.settings.twitter.secret,
      }
    }
  );
});
