import Config from '../Config';

function getHoverInfo(str: string, at: number, config: Config): string | null {
  if (str.match(/#([0-9]{4})+/g)) {
    // check if it's an event (#0000, #0001)
    return `Event **${str.substr(0, 5)}**`;
  }

  const commandTokenIdx = str.lastIndexOf('<', at);

  if (commandTokenIdx === -1) {
    return null;
  }

  const targetCommand = str.substr(commandTokenIdx, 4);
  const command = config.getTSCDefinition(targetCommand);

  if (!command) {
    return null;
  }

  let info = `Command **${command.format}**\n\n${command.documentation}`;

  let args: string[] = [];
  let strWithoutCommand = str.substr(commandTokenIdx).slice(4);

  if (command.nargs) {
    for (let i = 0; i < command.nargs; i++) {
      const arg = strWithoutCommand.substr(i * 5, 4);
      if (arg.length === 4 && (parseInt(arg + 1) || (arg[0] === 'V' && parseInt(arg.slice(1) + 1)))) {
        args.push(arg);
      }
    }

    if (args.length === command.nargs) {
      args = args.map((arg, idx) => {
        const value = config.getArgumentValue(command, idx, arg);

        if (value === arg) {
          return arg;
        }

        return `${arg}: ${value}`;
      });

      info += `\n\n* ${args.join('\n* ')}`;
    }
  }

  return info;
}

export default getHoverInfo;
