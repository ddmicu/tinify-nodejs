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
});
