/**
 *
 * @param {string} row
 * @returns {any}
 */
export function parseRow(row) {
  if (row.startsWith('$ ')) return parseCommand(row.slice(2));
  return parseOutput(row);
}

/**
 *
 * @param {string} command
 * @example parseCommand('cd a')
 * //=> { command: 'cd', directory: 'a' }
 * @example parseCommand('ls')
 * //=> { command: 'ls' }
 */
export function parseCommand(command) {
  if (command.startsWith('cd '))
    return { command: 'cd', directory: command.slice(3) };
  return { command: 'ls' };
}

/**
 * @param {string} output
 * @example parseOutput('dir a')
 * //=> { type: 'dir', dir: 'a' }
 * @example parseOutput('123 foo')
 * //=> { type: 'file', file: [123, 'foo' ]}
 */
export function parseOutput(output) {
  if (output.startsWith('dir')) return { type: 'dir', dir: output.slice(4) };
  const [size, filename] = output.split(' ');
  return { type: 'file', file: [Number(size), filename] };
}
