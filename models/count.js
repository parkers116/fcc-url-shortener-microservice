const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var countSchema = new Schema(
  {
    count: { type: Number, default: 1 }
  },
  { collection: "count" }
);

mongoose.model("Count", countSchema);
