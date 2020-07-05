import {
  createConnection,
  TextDocuments,
  Diagnostic,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  HoverParams,
  Hover,
  InsertTextFormat
} from 'vscode-languageserver';

import { TextDocument } from 'vscode-languageserver-textdocument';

import getHoverInfo from './util/getHoverInfo';
import validate from './util/validate';
import Config from './Config';

let connection = createConnection(ProposedFeatures.all);

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
let config = new Config();

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
  let capabilities = params.capabilities;

  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true
      },
      hoverProvider: true
    }
  };

  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true
      }
    };
  }

  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
});

documents.onDidChangeContent(change => {
  const diagnostics: Diagnostic[] = validate(change.document, config);
  connection.sendDiagnostics({
    uri: change.document.uri,
    diagnostics
  });
});

connection.onCompletion((): CompletionItem[] => {
  const definitions = config.getTSCDefinitionsArray();

  return definitions.map((def, idx) => {
    const completionItem: CompletionItem = {
      ...def,
      data: idx,
      kind: CompletionItemKind.Function
    };

    if (def.nargs > 0) {
      completionItem.insertTextFormat = InsertTextFormat.Snippet;
    }

    return completionItem;
  });
});

connection.onCompletionResolve(
  (item: CompletionItem): CompletionItem => item
);

connection.onHover(
  (params: HoverParams): Hover | undefined => {
    const document = documents.get(params.textDocument.uri);

    if (document === undefined) {
      return undefined;
    }

    const start = {
      line: params.position.line,
      character: 0
    };

    const end = {
      line: params.position.line + 1,
      character: 0
    };

    const text = document.getText({ start, end });
    const index = document.offsetAt(params.position) - document.offsetAt(start);
    const word = getHoverInfo(text, index, config);

    if (word?.length) {
      return {
        contents: {
          kind: 'markdown',
          value: word
        }
      };
    }
  }
);

documents.listen(connection);
connection.listen();
