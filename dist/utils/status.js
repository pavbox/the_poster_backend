"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Universal Response Factory.
 * Creates JSON-like response for send to frontend.
 * @param {String} status - status of request (success/error)
 * @param {String} event  - which emmited call response (add/get/notfound).
 * @param {Array} computedBody - advanced param for custom response Array.
 * @return {JSON Object}
 */

function createStatus(status, event, computedBody) {
  var statusFactory = {
    "success": {
      "status": "success",
      "statusCode": 200,
      "event": {
        "add": "New Post Uploaded",
        "get": "Post found",
        "detele": "Post removed",
        "update": "New Post Updated"
      }
    },
    "errorUser": {
      "status": "error",
      "statusCode": 404,
      "event": {
        "validation": "Validation Error",
        "notfound": "Not Found"
      }
    },
    "errorServer": {
      "status": "error",
      "statusCode": 500,
      "event": {
        "errorServer": "Internal Server Error"
      }
    }
  };

  if (computedBody === undefined) computedBody = statusFactory[status].event[event];

  return {
    "status": statusFactory[status].status,
    "statusCode": statusFactory[status].statusCode,
    "body": computedBody
  };
}

exports.default = createStatus;