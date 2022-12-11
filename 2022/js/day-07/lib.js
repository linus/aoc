/**
 * @typedef {{
 *   type: 'command',
 *   command: 'cd',
 *   directory: string
 * } | {
 *   type: 'command',
 *   command: 'ls'
 * }} Command
 *
 * @typedef {{
 *   type: 'output',
 *   outputType: 'dir',
 *   dir: string
 * } | {
 *   type: 'output',
 *   outputType: 'file',
 *   file: {
 *     size: number,
 *     name: string
 *   }
 * }} Output
 */
/**
 *
 * @param {string} row
 */
export function parseRow(row) {
  if (row.startsWith('$ ')) return parseCommand(row.slice(2));
  return parseOutput(row);
}

/**
 *
 * @param {string} command
 * @returns {Command}
 * @example parseCommand('cd a')
 * //=> { type: 'command', command: 'cd', directory: 'a' }
 * @example parseCommand('ls')
 * //=> { type: 'command', command: 'ls' }
 */
export function parseCommand(command) {
  if (command.startsWith('cd '))
    return { type: 'command', command: 'cd', directory: command.slice(3) };
  return { type: 'command', command: 'ls' };
}

/**
 * @param {string} output
 * @returns {Output}
 * @example parseOutput('dir a')
 * //=> { type: 'output', outputType: 'dir', dir: 'a' }
 * @example parseOutput('123 foo')
 * //=> {
 *   type: 'output',
 *   outputType: 'file',
 *   file: {
 *     size: 123,
 *     name: 'foo'
 *   }
 * }
 */
export function parseOutput(output) {
  if (output.startsWith('dir'))
    return { type: 'output', outputType: 'dir', dir: output.slice(4) };
  const [size, filename] = output.split(' ');
  return {
    type: 'output',
    outputType: 'file',
    file: {
      size: Number(size),
      name: filename,
    },
  };
}
