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
  doctest('day-1/solution.js', doctestOptions);
  doctest('day-2/solution.js', doctestOptions);
});
