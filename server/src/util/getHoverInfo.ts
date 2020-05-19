import definitions from '../definitions';

function getHoverInfo(str: string, at: number): string | null {
  if (str.match(/#([0-9]{4})+/g)) {
    // check if it's an event (#0000, #0001)
    return `Event **${str.substr(0, 5)}**`;
  }

  const commandTokenIdx = str.lastIndexOf('<', at);

  if (commandTokenIdx === -1) {
    return null;
  }

  const targetCommand = str.substr(commandTokenIdx, 4);
  const command = definitions.find(command => command.key === targetCommand);

  if (!command) {
    return null;
  }

  return `Command **${command.format}**\n\n${command.documentation}`;
}

export default getHoverInfo;
