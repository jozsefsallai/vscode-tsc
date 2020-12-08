import { ExtensionContext, workspace, Uri, commands, window, Range, Position } from 'vscode';

import {
	LanguageClient,
	ServerOptions,
	LanguageClientOptions
} from 'vscode-languageclient';
import { EncodedTSCFileSystemProvider } from './EncodedTSCFileSystemProvider';
import { getLanguageServerPath } from './langserver';

let client: LanguageClient;
let extensionDir: string;

const isEncodedTSC = (data: string): boolean => {
	const commandRegex = /<[A-Z-+0-9]{3}/g;
	const eventIDRegex = /#[0-9]{4}/g;
	
	return commandRegex.test(data) && eventIDRegex.test(data);
};

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

	workspace.registerFileSystemProvider('encoded-tsc', new EncodedTSCFileSystemProvider(), {
		isCaseSensitive: process.platform === 'linux'
	});

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

	workspace.onDidOpenTextDocument(e => {
		if (e.languageId === 'tsc' && e.uri.scheme !== 'encoded-tsc') {
			const reopenAction = 'Reopen in text view';

			// Check if the .tsc file is encoded.
			const startPos = e.positionAt(0);
			const endPos = e.positionAt(512);
			const tscData = e.getText(new Range(startPos, endPos));
			
			if (isEncodedTSC(tscData)) {
				return;
			}

			window.showInformationMessage(
				'Encrypted TSC found, do you want to reopen it in decoded mode (the file will be still saved as encrypted)?', 
				reopenAction
			).then(async result => {
				if (result !== reopenAction) {
					return;
				}

				const uri = Uri.file(e.fileName).with({scheme: 'encoded-tsc'});
				try {
					const doc = await workspace.openTextDocument(uri);
					await window.showTextDocument(doc, { preview: false });
				} catch (e) {
					console.error(e);
				}
			});
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
