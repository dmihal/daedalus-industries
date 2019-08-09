import { Meteor } from 'meteor/meteor';
import { Items } from '../collections';

Meteor.publish('items', function items() {
  return Items.find();
});
