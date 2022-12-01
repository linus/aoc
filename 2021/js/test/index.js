const { default: doctest } = require('@supabase/doctest-js');
const { expect } = require('chai');

// We need this since @supabase/doctest-js is broken (see issue
// here: https://github.com/kiwicopple/doctest-js/issues/118).
// As a workaround, we supply our own (less incorrect) testingFunction.
const doctestOptions = {
  testingFunction: (actual, expected, doctest) => {
    it(`doctest: ${doctest.resultString}`, () => {
      expect(actual.result).to.eql(expected.result);
    });
  },
};

describe('Solutions', () => {
  describe('Day 1', () => doctest('day-1/solution.js', doctestOptions));
  describe('Day 2', () => doctest('day-2/solution.js', doctestOptions));
  describe('Day 3', () => doctest('day-3/solution.js', doctestOptions));
  describe('Day 4', () => doctest('day-4/solution.js', doctestOptions));
  describe('Day 5', () => doctest('day-5/solution.js', doctestOptions));
  describe('Day 6', () => doctest('day-6/solution.js', doctestOptions));
  describe('Day 7', () => doctest('day-7/solution.js', doctestOptions));
  //describe('Day 14', () => doctest('day-14/solution.js', doctestOptions));
  //describe('Day 15', () => doctest('day-15/solution.js', doctestOptions));
});
