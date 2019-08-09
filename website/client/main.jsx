import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './App';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});

Meteor.callPromise = function callPromise(...args) {
  return new Promise((resolve, reject) => {
    Meteor.call(...args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
