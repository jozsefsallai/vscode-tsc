import * as vscode from 'vscode';
import * as fs from 'fs';

export class EncodedTSCFileSystemProvider implements vscode.FileSystemProvider {
	onDidChangeFile: vscode.Event<
		vscode.FileChangeEvent[]
	> = new vscode.EventEmitter<vscode.FileChangeEvent[]>().event;

	watch(
		uri: vscode.Uri,
		options: { recursive: boolean; excludes: string[] }
	): vscode.Disposable {
		return new vscode.Disposable(() => {});
	}

	async stat(uri: vscode.Uri): Promise<vscode.FileStat> {
		try {
			const stat = await fs.promises.stat(uri.fsPath);
			const type = stat.isSymbolicLink()
				? vscode.FileType.SymbolicLink
				: stat.isDirectory()
				? vscode.FileType.Directory
				: stat.isFile()
				? vscode.FileType.File
				: vscode.FileType.Unknown;

			return {
				type,
				size: stat.size,
				ctime: stat.ctimeMs,
				mtime: stat.mtimeMs,
			};
		} catch (e) {
			throw vscode.FileSystemError.FileNotFound(uri);
		}
	}

	readDirectory(
		uri: vscode.Uri
	): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]> {
		return [];
	}

	createDirectory(uri: vscode.Uri): void | Thenable<void> {}

	async readFile(uri: vscode.Uri): Promise<Uint8Array> {
		const buf = await fs.promises.readFile(uri.fsPath);

		const half = (buf.length / 2) | 0;
		const key = buf[half] === 0 ? 0xf9 : -buf[half] & 0xff;

		for (let i = 0; i < buf.length; i++) {
			buf[i] = (buf[i] + key) & 0xff;
		}

		console.log('Loaded encoded TSC', uri.fsPath, 'with key:', key);
		return buf;
	}

	async writeFile(
		uri: vscode.Uri,
		buf: Uint8Array,
		options: { create: boolean; overwrite: boolean }
	): Promise<void> {
		const half = (buf.length / 2) | 0;
		const key = buf[half] === 0 ? 0xf9 : -buf[half] & 0xff;

		for (let i = 0; i < buf.length; i++) {
			buf[i] = (buf[i] - key) & 0xff;
		}

		fs.writeFileSync(uri.fsPath, buf);
		console.log('Saved encoded TSC', uri.fsPath, 'with key:', key);
	}

	delete(
		uri: vscode.Uri,
		options: { recursive: boolean }
	): void | Thenable<void> {}

	rename(
		oldUri: vscode.Uri,
		newUri: vscode.Uri,
		options: { overwrite: boolean }
	): void | Thenable<void> {}
}
