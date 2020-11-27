# TSC for Visual Studio Code

This extension for Visual Studio code will provide syntax highlighting, auto-completion, and diagnostics for the TSC scripting format used in the game Cave Story and other related games.

The extension implements the [TSC Language Server](https://github.com/nimblebun/tsc-language-server) and the [.tscrc.json spec](https://docs.nimblebun.works/tscrc-json)

## Features

- Syntax highlighting

![Syntax highlighting](.github/assets/screenshot-syntax-highlighting.png)

- Command autocompletion

![Command autocompletion](.github/assets/screenshot-autocomplete.png)

![Command autocompletion](.github/assets/screenshot-autocomplete-2.png)

- Command syntax checker

![Syntax checker](.github/assets/screenshot-syntax-error.png)

- Helpful messages for commands on hover

![On hover](.github/assets/screenshot-hover.png)

- Event duplication checker

![Event duplication checker](.github/assets/screenshot-event-dedupe.png)

- Warning on messagebox overflow

![Message overflow warning](.github/assets/screenshot-message-overflow.png)

## Planned Features

- [ ] Event folding

## Contribution

**1. Clone the repo:**

```sh
git clone git@github.com:jozsefsallai/tsc-language-tooling.git
```

**2. Install the dependencies:**

```sh
npm i
```

**3. Watch or compile:**

```sh
npm run watch
npm run compile
```

Don't forget to make sure that your changes pass the linter:

```sh
npm run lint
```

## License

MIT. Cave Story (Doukutsu Monogatari) is the property of Daisuke "Pixel" Amaya and Nicalis, Inc.
