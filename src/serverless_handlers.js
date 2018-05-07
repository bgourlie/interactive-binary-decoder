const AWS = require("aws-sdk");
require("../serverless_dist/ssr_handler");
module.exports.ssr = parcelRequire("1").ssr(new AWS.S3());
