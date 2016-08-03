# Meteor Elastic Beanstalk

This package is meant to make your life easier when hosting a meteor app in the [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/). So far, it's not all that complicated except for settings.

## Install
```
> cd path/to/your/meteor/app/
> git clone git@github.com:mkornatz/meteor-elastic-beanstalk.git packages/meteor-elastic-beanstalk
> meteor add mkornatz:meteor-elastic-beanstalk
```

## METEOR_SETTINGS in an Environment Variable
The Elastic Beanstalk and meteor break if you put the JSON contents of your settings.json directly into a `METEOR_SETTINGS` environment variable ([due to encoding issues](http://stackoverflow.com/questions/34761577/how-to-config-meteor-on-aws-ebs-using-meteor-settings-environment-variable)). So, this package lets you create an environment variable in the Elastic Beanstalk called `METEOR_SETTINGS_ENCODED` which holds a url encoded version of your settings.json file.

So, here's how to use it...

### 1. Encode your settings.json file
There's a script included in `scripts/` to encode any valid JSON file.

```
# First, Install node dependencies for the encode script
> cd packages/meteor-elastic-beanstalk/
> npm install

# Encode your settings.json file
> npm run-script encode path/to/my/settings.json

Your METEOR_SETTINGS_ENCODED value is: %7B%0A%20%20%22public%22%3A...
```

### 2. Add the environment variable to your AWS Elastic Beanstalk
Copy the encoded output from the previous step and use the [AWS console](http://docs.aws.amazon.com/gettingstarted/latest/deploy/envvar.html) or the [AWS CLI tool](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-setenv.html) to set the `METEOR_SETTINGS_ENCODED` variable with the URI encoded JSON.

### 3. Run your app
The package will notice `METEOR_SETTINGS_ENCODED` if it's set, and set the settings appropriately.

Note: If the `METEOR_SETTINGS` environment variable is set, `METEOR_SETTINGS_ENCODED` is disregarded.

## Testing
Because the tests rely on environment variables, you need to set the env variable before running the tests.
```
> export METEOR_SETTINGS_ENCODED="%7B%22foo%22%3A%22bar%22%7D" && meteor test-packages --driver-package practicalmeteor:mocha mkornatz:elastic-beanstalk
```

## TODO
* Add nginx configuration scripts to be used as ebextensions?

## LICENSE

MIT.
