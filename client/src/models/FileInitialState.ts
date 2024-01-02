import { FileResponse } from "./FilesResponse"

export interface FileInitialState {
	files: Array<FileResponse>
	currentDir: number | null
	stackPath: Array<null | number>
}
