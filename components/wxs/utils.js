/* eslint-disable */
var bem = require('./bem.js').bem;
var memoize = require('./memoize.js').memoize;
var addUnit = require('./add-unit.js').addUnit;

module.exports = {
  bem: memoize(bem),
  memoize: memoize,
  addUnit: addUnit
};