'use strict';

const config = require('../config');
const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

// https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=b48033fa43334d069d193fcb1fda9ec3
let openCage_KEY= config.openCage_KEY; 

service.get('/service/:location', (req, res, next) => {
    
    const PLACENAME = req.params.location;
    request.get('https://api.opencagedata.com/geocode/v1/json?q='+PLACENAME + '&key='+openCage_KEY, (err, response)=>{
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var offset = response.body.results[0].annotations.timezone.offset_sec

        const timeStamp = +moment().format('X');
        const timeString = moment.unix(timeStamp + offset).utc().format("dddd, MMMM Do YYYY, h:mm:ss a");

        res.json({ result: timeString });
    });
});

module.exports = service;