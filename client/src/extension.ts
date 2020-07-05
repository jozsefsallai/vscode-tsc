import * as path from 'path';
import { ExtensionContext, workspace, Uri } from 'vscode';

import {
  LanguageClient,
  ServerOptions,
  TransportKind,
  LanguageClientOptions
} from 'vscode-languageclient';

let client: LanguageClient;

function getRcURI() {
  return Uri.joinPath(workspace.workspaceFolders[0].uri, '.tscrc.json');
}

function sendConfigUpdateRequest() {
  workspace.fs.readFile(getRcURI())
    .then(buffer => {
      const contents = buffer.toString();

      try {
        const json = JSON.parse(contents);
        client.sendRequest('tsc/setConfig', json);
      } catch {
        console.log('Local .tscrc.json is invalid. Using default config.');
      }
    }, function () {
      console.log('Local .tscrc.json does not exist. Using default config.');
    });
}

function sendConfigResetRequest() {
  client.sendRequest('tsc/resetConfig');
}

export function activate(context: ExtensionContext) {
  let serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  );

  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  let serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  let clientOptions: LanguageClientOptions = {
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

  client = new LanguageClient(
    'tsc',
    'Cave Story TSC Language Client',
    serverOptions,
    clientOptions
  );

  client.start();

  client.onReady().then(sendConfigUpdateRequest);

  workspace.onDidRenameFiles(function (e) {
    if (e.files.find(f => f.newUri.toString() === getRcURI().toString())) {
      sendConfigUpdateRequest();
    }

    if (e.files.find(f => f.oldUri.toString() === getRcURI().toString())) {
      sendConfigResetRequest();
    }
  });

  workspace.onDidDeleteFiles(function (e) {
    if (e.files.map(f => f.toString()).includes(getRcURI().toString())) {
      sendConfigResetRequest();
    }
  });

  workspace.onDidSaveTextDocument(function (e) {
    if (e.uri.toString() === getRcURI().toString()) {
      sendConfigUpdateRequest();
    }
  });
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }

  return client.stop();
}
