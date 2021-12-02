/**
 * @tscheck
 * 
 * The first order of business is to figure out how quickly the depth
 * increases, just so you know what you're dealing with - you never know if
 * the keys will get carried into deeper water by an ocean current or a fish
 * or something.
 *
 * To do this, count **the number of times a depth measurement increases** from
 * the previous measurement. (There is no measurement before the first
 * measurement.) In the example above, the changes are as follows:
 *
 * ```text
 * 199 (N/A - no previous measurement)
 * 200 (increased)
 * 208 (increased)
 * 210 (increased)
 * 200 (decreased)
 * 207 (increased)
 * 240 (increased)
 * 269 (increased)
 * 260 (decreased)
 * 263 (increased)
 * ```
 *
 * In this example, there are `7` measurements that are larger than the previous
 * measurement.
 *
 * **How many measurements are larger than the previous measurement?**
 *
 * @param {number[]} numbers The depth measurements to process
 *
 * @returns {number} The number of measurements that are larger than the
 * previous measurement
 *
 * @example part1([
 *   199,
 *   200,
 *   208,
 *   210,
 *   200,
 *   207,
 *   240,
 *   269,
 *   260,
 *   263,
 * ])
 * //=> 7
 */

function part1 (numbers) {
    return numbers.reduce((numIncreases, number, index, array) => {
        return (array[index - 1] && number > array[index - 1])
          ? numIncreases + 1
          : numIncreases;
    }, 0);
}

/**
 * Considering every single measurement isn't as useful as you expected:
 * there's just too much noise in the data.
 *
 * Instead, consider sums of a **three-measurement sliding window**. Again
 * considering the above example:
 *
 * ```text // eslint-disable-next-line prettier/prettier

 * 199  A      
 * 200  A B    
 * 208  A B C  
 * 210    B C D
 * 200  E   C D
 * 207  E F   D
 * 240  E F G  
 * 269    F G H
 * 260      G H
 * 263        H
 * ```
 *
 * Start by comparing the first and second three-measurement windows. The
 * measurements in the first window are marked A (199, 200, 208); their sum is
 * 199 + 200 + 208 = 607. The second window is marked B (200, 208, 210); its
 * sum is 618. The sum of measurements in the second window is larger than the
 * sum of the first, so this first comparison **increased**.
 *
 * Your goal now is to count **the number of times the sum of measurements in
 * this sliding window increases** from the previous sum. So, compare A with B,
 * then compare B with C, then C with D, and so on. Stop when there aren't
 * enough measurements left to create a new three-measurement sum.
 *
 * In the above example, the sum of each three-measurement window is as follows:
 *
 * ```text
 * A: 607 (N/A - no previous sum)
 * B: 618 (increased)
 * C: 618 (no change)
 * D: 617 (decreased)
 * E: 647 (increased)
 * F: 716 (increased)
 * G: 769 (increased)
 * H: 792 (increased)
 * ```
 *
 * In this example, there are `5` sums that are larger than the previous sum.
 *
 * Consider sums of a three-measurement sliding window. **How many sums are
 * larger than the previous sum?**
 *
 * @param {number[]} numbers The depth measurements to process
 *
 * @returns {number} The number of sums of three-measurement sliding windows
 *     that are larger than the previous sum
 *
 * @example part2([
 *   199,
 *   200,
 *   208,
 *   210,
 *   200,
 *   207,
 *   240,
 *   269,
 *   260,
 *   263,
 * ])
 * //=> 5
 */
function part2 (numbers) {
    let numIncreases = 0;
    let last = null;
    for (let window of slidingWindow(numbers, 3)) {
        const sum = window.reduce((sum, num) => sum + num);
        if (last !== null && sum > last) {
            numIncreases++;
        }
        last = sum;
    }

    return numIncreases;

    function * slidingWindow(array, size) {
        for (let index = 0; index + size <= array.length; index++) {
            yield array.slice(index, index + size);
        }
    }
}

module.exports = {
  part1,
  part2,
};
