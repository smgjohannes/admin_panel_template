import _ from 'lodash';
let env = process.env;

let config = {
  development: {
    homeUrl: 'http://localhost:4343',
    baseUrl: 'http://localhost:1000',
    //baseUrl: 'https://nc.mindsinaction.com.na',
  },

  production: {
    homeUrl: 'https://cms.mindsinaction.com.na',
    baseUrl: 'https://nc.mindsinaction.com.na',
  },
};

export default _.extend({}, config.general, config[env.NODE_ENV]);
