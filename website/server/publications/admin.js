import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('admin', function admin() {
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    throw new Meteor.Error('Unauthorized');
  }
  return Meteor.users.find({}, {
    fields: { profile: 1 },
  });
});
