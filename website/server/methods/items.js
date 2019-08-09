import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items } from '../collections';

Meteor.methods({
  addItem(name) {
    check(name, String);
    Items.insert({ name });
  },
});
