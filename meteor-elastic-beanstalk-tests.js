import { Meteor } from 'meteor/meteor';
import 'meteor/mkornatz:elastic-beanstalk';
import { chai } from 'meteor/practicalmeteor:chai';

describe('elastic-beanstalk', function () {
  it('applies settings correctly', function () {
    chai.assert.equal(Meteor.settings.foo, 'bar');
  });
});
