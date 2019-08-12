import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getUser() {
    return Meteor.users.findOne(this.userId, { fields: { profile: 1 } });
  },
});
