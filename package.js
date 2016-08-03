Package.describe({
  name: 'mkornatz:elastic-beanstalk',
  version: '0.0.1',
  summary: 'A helper package for hosting apps in the AWS Elastic Beanstalk',
  git: 'git@github.com:mkornatz/meteor-elastic-beanstalk.git',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'logging'], 'server');
  api.mainModule('meteor-elastic-beanstalk.js', 'server');
});

Package.onTest(function (api) {
  api.use([
    'ecmascript',
    'practicalmeteor:mocha',
    'mkornatz:elastic-beanstalk',
  ], 'server');
  api.mainModule('meteor-elastic-beanstalk-tests.js', 'server');
});
