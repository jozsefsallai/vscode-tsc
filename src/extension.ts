import { ExtensionContext, workspace, Uri, commands, window } from 'vscode';

import {
	LanguageClient,
	ServerOptions,
	LanguageClientOptions
} from 'vscode-languageclient';
import { getLanguageServerPath } from './langserver';

let client: LanguageClient;
let extensionDir: string;

const getRcUri = () => workspace.workspaceFolders && Uri.joinPath(workspace.workspaceFolders[0].uri, '.tscrc.json');

const sendConfigUpdateRequest = () => {
	const uri = getRcUri();

	if (!uri) {
		return;
	}

	workspace.fs.readFile(uri)
		.then(buffer => {
			const contents = buffer.toString();

			try {
				const json = JSON.parse(contents);
				client.sendRequest('tsc/setConfig', json);
			} catch {
				console.log('Local .tscrc.json is invalid. Using default configuration.');
			}
		}, function () {
			console.log('Local .tscrc.json does not exist. Using default configuration.');
		});
};

const sendConfigResetRequest = () => client.sendRequest('tsc/resetConfig');

export async function activate(ctx: ExtensionContext) {
	extensionDir = ctx.extensionPath;

	const lspCommand = await getLanguageServerPath(extensionDir);

	const executable = {
		command: lspCommand,
		args: [ 'start' ]
	};

	const serverOptions: ServerOptions = {
		run: executable,
		debug: executable
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{
				scheme: 'file',
				language: 'tsc'
			},
			{
				scheme: 'untitled',
				language: 'tsc'
			}
		]
	};

	client = new LanguageClient('tsc', 'Cave Story TSC', serverOptions, clientOptions);
	client.start();

	client.onReady().then(sendConfigUpdateRequest);

	workspace.onDidRenameFiles(e => {
		const rcUri = getRcUri()?.toString() ?? '';

		if (e.files.find(f => f.newUri.toString() === rcUri)) {
			sendConfigUpdateRequest();
		}

		if (e.files.find(f => f.oldUri.toString() === rcUri)) {
			sendConfigResetRequest();
		}
	});

	workspace.onDidDeleteFiles(e => {
		const rcUri = getRcUri()?.toString() ?? '';

		if (rcUri && e.files.map(f => f.toString()).includes(rcUri)) {
			sendConfigResetRequest();
		}
	});

	workspace.onDidSaveTextDocument(e => {
		const rcUri = getRcUri()?.toString() ?? '';

		if (e.uri.toString() === rcUri) {
			sendConfigUpdateRequest();
		}
	});

	ctx.subscriptions.push(commands.registerCommand('vscode-tsc.restartLsp', async () => {
		if (!client) {
			// should never fire but we're checking anyway
			return;
		}

		await client.stop();
		await client.start();
		sendConfigUpdateRequest();
	}));
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}

	return client.stop();
}
