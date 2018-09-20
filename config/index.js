require('dotenv').config();
const bunyan = require('bunyan');
const serviceAccessToken = require('crypto').randomBytes(16).toString('hex').slice(0, 32);

const log = {
    development: () => {
        return bunyan.createLogger({name: 'IRIS-Time-development', level: 'debug'});
    },
    production: () => {
        return bunyan.createLogger({name: 'IRIS-Time-production', level: 'info'});
    },
    test: () => {
        return bunyan.createLogger({name: 'IRIS-Time-test', level: 'fatal'});
    }
};

module.exports = {
    openCage_KEY: process.env.openCage_KEY,
    irisApiToken: process.env.IRIS_API_TOKEN,
    serviceAccessToken: serviceAccessToken,
    log: (env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};