import * as vscode from 'vscode'

export enum FileSystemProviderErrorCode {
  FileExists = 'EntryExists',
  FileNotFound = 'EntryNotFound',
  FileNotADirectory = 'EntryNotADirectory',
  FileIsADirectory = 'EntryIsADirectory',
  FileExceedsStorageQuota = 'EntryExceedsStorageQuota',
  FileTooLarge = 'EntryTooLarge',
  FileWriteLocked = 'EntryWriteLocked',
  NoPermissions = 'NoPermissions',
  Unavailable = 'Unavailable',
  Unknown = 'Unknown',
}

export function markAsFileSystemProviderError(
  error: Error,
  code: FileSystemProviderErrorCode
): Error {
  error.name = code ? `${code} (FileSystemError)` : `FileSystemError`

  return error
}

export class FileSystemError extends Error {
  static FileExists(messageOrUri?: string | vscode.Uri): FileSystemError {
    return new FileSystemError(
      messageOrUri,
      FileSystemProviderErrorCode.FileExists,
      FileSystemError.FileExists
    )
  }
  static FileNotFound(messageOrUri?: string | vscode.Uri): FileSystemError {
    return new FileSystemError(
      messageOrUri,
      FileSystemProviderErrorCode.FileNotFound,
      FileSystemError.FileNotFound
    )
  }
  static FileNotADirectory(
    messageOrUri?: string | vscode.Uri
  ): FileSystemError {
    return new FileSystemError(
      messageOrUri,
      FileSystemProviderErrorCode.FileNotADirectory,
      FileSystemError.FileNotADirectory
    )
  }
  static FileIsADirectory(messageOrUri?: string | vscode.Uri): FileSystemError {
    return new FileSystemError(
      messageOrUri,
      FileSystemProviderErrorCode.FileIsADirectory,
      FileSystemError.FileIsADirectory
    )
  }
  static NoPermissions(messageOrUri?: string | vscode.Uri): FileSystemError {
    return new FileSystemError(
      messageOrUri,
      FileSystemProviderErrorCode.NoPermissions,
      FileSystemError.NoPermissions
    )
  }
  static Unavailable(messageOrUri?: string | vscode.Uri): FileSystemError {
    return new FileSystemError(
      messageOrUri,
      FileSystemProviderErrorCode.Unavailable,
      FileSystemError.Unavailable
    )
  }

  readonly code: string

  constructor(
    uriOrMessage?: string | vscode.Uri,
    code: FileSystemProviderErrorCode = FileSystemProviderErrorCode.Unknown,
    terminator?: Function
  ) {
    super(
      uriOrMessage instanceof vscode.Uri
        ? uriOrMessage.toString(true)
        : uriOrMessage
    )

    this.code = terminator?.name ?? 'Unknown'

    // mark the error as file system provider error so that
    // we can extract the error code on the receiving side
    markAsFileSystemProviderError(this, code)

    // workaround when extending builtin objects and when compiling to ES5, see:
    // https://github.com/microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, FileSystemError.prototype)

    if (
      typeof Error.captureStackTrace === 'function' &&
      typeof terminator === 'function'
    ) {
      // nice stack traces
      Error.captureStackTrace(this, terminator)
    }
  }
}

export enum FileType {
  /**
   * File is unknown (neither file, directory nor symbolic link).
   */
  Unknown = 0,

  /**
   * File is a normal file.
   */
  File = 1,

  /**
   * File is a directory.
   */
  Directory = 2,

  /**
   * File is a symbolic link.
   *
   * Note: even when the file is a symbolic link, you can test for
   * `FileType.File` and `FileType.Directory` to know the type of
   * the target the link points to.
   */
  SymbolicLink = 64,
}
