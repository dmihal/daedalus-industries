import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';

const data = ({ role }) => ({
  isUser: !!Meteor.userId(),
  isRole: !role || Roles.userIsInRole(Meteor.userId(), role),
});

const IsUser = ({ children, isUser, isRole }) => {
  if (!(isUser && isRole)) {
    return null;
  }

  if (children.constructor === Function) {
    return children();
  }

  return children;
}

export default withTracker(data)(IsUser);
