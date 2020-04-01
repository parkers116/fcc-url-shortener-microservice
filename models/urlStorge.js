const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var urlStorageSchema = new Schema(
  {
    short_url: Number,
    original_url: String
  },
  { collection: "UrlStorage" }
);

mongoose.model("UrlStorage", urlStorageSchema);
