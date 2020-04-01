const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var urlStorageSchema = new Schema(
  {
    original_url: String,
    short_url: Number
  },
  { collection: "UrlStorage" }
);

mongoose.model("UrlStorage", urlStorageSchema);
