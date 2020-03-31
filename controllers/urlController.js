const mongoose = require('mongoose')

require('../models/urlStorge.js')
require('../models/count.js')

exports.postUrl = (req, res, callback) => {
    let UrlStorage = mongoose.model('UrlStorage')
    let Urlregex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    //check the url is valid or not
    console.log(Urlregex.test(req.body.url))
}
