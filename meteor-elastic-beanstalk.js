import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';

/**
 * This code gets executed before any dependencies get loaded.
 * So, you can't count on things like underscore being available unless explicity loading them.
 */
const encodedSettings = process.env.METEOR_SETTINGS_ENCODED;

if (typeof encodedSettings !== 'undefined' && typeof process.env.METEOR_SETTINGS !== 'object') {
  const decodedSettings = decodeURIComponent(encodedSettings);

  let parsedSettings;

  try {
    parsedSettings = JSON.parse(decodedSettings);
  } catch (e) {
    Log.error('Elastic Beanstalk: METEOR_SETTINGS_ENCODED is not valid urlencoded JSON');
  }

  if (typeof parsedSettings !== 'undefined') {
    Log.info('Elastic Beanstalk: Decoding METEOR_SETTINGS_ENCODED into METEOR_SETTINGS');

    Meteor.settings = parsedSettings;

    // This is a special meteor runtime variable
    if (typeof __meteor_runtime_config__ === 'object') {
      __meteor_runtime_config__.PUBLIC_SETTINGS = Meteor.settings.public;
    }
  }
}
