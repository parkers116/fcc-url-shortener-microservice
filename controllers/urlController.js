const mongoose = require("mongoose");
const dns = require("dns");

require("../models/urlStorge.js");
require("../models/count.js");

exports.postNewUrl = (req, res) => {
  let UrlStorage = mongoose.model("UrlStorage");
  let Count = mongoose.model("Count");
  let httpRegex = /https?:\/\//;
  let UrlRegex = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/;
  let targetHost = "";

  //check the url is valid or not
  if (httpRegex.test(req.body.url) && UrlRegex.test(req.body.url)) {
    if (/\/$/i.test(req.body.url)) {
      targetHost = req.body.url.slice(0, -1).match(UrlRegex)[0];
    } else {
      targetHost = req.body.url.match(UrlRegex)[0];
    }

    dns.lookup(targetHost, err => {
      if (err) {
        res.json({ error: "invalid Hostname" });
        return;
      }
      console.log("NO ERROR IN DNS LOOKUP!");
      UrlStorage.findOne({ original_url: req.body.url }, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("NO ERROR IN UrlStorage.findOne!");
        if (data) {
          res.json({
            original_url: data.original_url,
            short_url: data.short_url
          });
        } else {
          Count.findOneAndUpdate(
            {},
            { $inc: { count: 1 } },
            { new: true, useFindAndModify: false },
            (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("NO ERROR IN Counter.findOneAndUpdate!");
              if (!data) {
                let newCount = new Count();
                newCount.save(err => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                });
              } else {
                console.log("count:" + data.count);
              }
              let newUrlStorage = new UrlStorage({
                original_url: req.body.url,
                short_url: data ? data.count : 1
              });
              newUrlStorage.save(err => {
                if (err) {
                  console.error(err);
                  return;
                }
                res.json({
                  original_url: req.body.url,
                  short_url: data ? data.count : 1
                });
              });
            }
          );
        }
      });
    });
  }
};

exports.getUrl = (req, res) => {
  let UrlStorage = mongoose.model("UrlStorage");
  UrlStorage.findOne({ short_url: req.params.short_url }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (data) {
      res.redirect(data.original_url);
    } else {
      res.json({ error: "invalid URL" });
    }
  });
};
