import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

const data = () => ({
  users: Meteor.users.find().fetch(),
  loading: !Meteor.subscribe('admin').ready(),
});

const Users = ({ users }) => (
  <div>
    <h1>Users</h1>
    <ul>
      {users.map(user => (
        <li>{user.profile.name}</li>
      ))}
    </ul>
  </div>
);

export default withTracker(data)(Users);
