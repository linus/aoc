import { parseMap } from './lib.js';
import { chunkArray, range } from '../utils.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * seeds: 79 14 55 13
 *
 * seed-to-soil map:
 * 50 98 2
 * 52 50 48
 *
 * soil-to-fertilizer map:
 * 0 15 37
 * 37 52 2
 * 39 0 15
 *
 * fertilizer-to-water map:
 * 49 53 8
 * 0 11 42
 * 42 0 7
 * 57 7 4
 *
 * water-to-light map:
 * 88 18 7
 * 18 25 70
 *
 * light-to-temperature map:
 * 45 77 23
 * 81 45 19
 * 68 64 13
 *
 * temperature-to-humidity map:
 * 0 69 1
 * 1 0 69
 *
 * humidity-to-location map:
 * 60 56 37
 * 56 93 4
 * `)
 * //=> {
 *   part1: 35,
 *   part2: 46,
 * }
 */
export function solution(input) {
  const [seedsDefinition, ...mapDefinitions] = input.trim().split('\n\n');
  const seeds = seedsDefinition.split(/:\s+/)[1].split(/\s+/).map(Number);
  const [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  ] = mapDefinitions.map((mapDefinition) =>
    parseMap(mapDefinition.split('\n').slice(1))
  );

  let lowestLocation = Infinity;
  for (const [start, length] of chunkArray(seeds, 2)) {
    for (let i = start; i < start + length; i++) {
      let location = getLocation(i);
      if (location < lowestLocation) {
        lowestLocation = location;
        console.log(lowestLocation);
      }
    }
  }

  return {
    part1: seeds.map(getLocation).sort((a, b) => a - b)[0],
    part2: lowestLocation,
  };

  function getLocation(seed) {
    const soil = seedToSoilMap[seed];
    const fertilizer = soilToFertilizerMap[soil];
    const water = fertilizerToWaterMap[fertilizer];
    const light = waterToLightMap[water];
    const temperature = lightToTemperatureMap[light];
    const humidity = temperatureToHumidityMap[temperature];
    const location = humidityToLocationMap[humidity];
    return location;
  }
}
