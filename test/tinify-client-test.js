"use strict";

const tinify = require("../lib");
const assert = require("chai").assert;
const nock = require("nock");
const semver = require("semver");

describe("Client", function () {
  beforeEach(function () {
    tinify.Client.RETRY_DELAY = 10;
    this.subject = new tinify.Client("key");
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe("request", function () {
    describe("with bad credentials", function () {
      let error;

      beforeEach(async function () {
        const request = nock("https://api.tinify.com")
          .get("/")
          .reply(401, '{"error":"Unauthorized","message":"Oops!"}');

        let temp = await this.subject.request("get", "/").catch(function (err) {
          // console.log("!!", err);
          error = err;
        });
        // console.log(temp);
        return temp;
      });

      it("should pass account error", function () {
        assert.instanceOf(error, tinify.AccountError);
      });

      it("should pass error with message", function () {
        assert.equal(error.message, "Oops! (HTTP 401/Unauthorized)");
      });

      // it("should pass error with stack", function () {
      //   assert.match(error.stack, /at( new)? AccountError/);
      // });
    });
  });
});
