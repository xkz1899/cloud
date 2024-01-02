import React, { useState } from "react"
import st from "./File.module.scss"
import { BsFolderFill } from "react-icons/bs"
import { AiFillFile, AiOutlineDownload } from "react-icons/ai"
import { FileResponse } from "./../../models/FilesResponse"
import { IoIosRemoveCircle } from "react-icons/io"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import { pushStackPath, setCurrentDir } from "../../store/reducers/fileSlice"
import { downloadFile } from "../../actions/fileAction"
import { deleteFiles } from "./../../actions/fileAction"
import sizeFormat from "../../utils/sizeFormat"

interface IFile {
	file: FileResponse
}

const File = ({ file }: IFile) => {
	const dispatch = useAppDispatch()
	const { currentDir } = useAppSelector(state => state.fileSlice)

	const nextClickHandler = () => {
		if (file.type === "dir") {
			dispatch(pushStackPath(currentDir))
			dispatch(setCurrentDir(file.id))
		}
	}
	const downloadClickHandler = (e: React.MouseEvent) => {
		if (file.type !== "dir") {
			e.stopPropagation()
			dispatch(downloadFile(file))
		}
	}
	const removeFileClickHandler = (e: React.MouseEvent) => {
		e.stopPropagation()
		dispatch(deleteFiles(file))
	}

	return (
		<>
			<div
				onDoubleClick={nextClickHandler}
				className={st.main}
				title={`Название: ${file.name}\nТип: ${file.type}\nРазмер: ${file.size} Byte`}
			>
				<div className={st.name}>
					{file.type === "dir" ? <BsFolderFill /> : <AiFillFile />}
					<p>
						{file.name.slice(0, 20)}
						{file.name.length > 20 && "..."}
					</p>
				</div>
				<p className={st.type}>{file.type === "dir" ? "Папка" : file.type}</p>
				<p className={st.date}>{(file.date + "").slice(0, 10)}</p>
				<p className={st.size}>{sizeFormat(file.size)}</p>
				<button
					className={st.download}
					onClick={downloadClickHandler}
					title="Скачать"
				>
					<AiOutlineDownload size="25" />
				</button>
				<button
					onClick={removeFileClickHandler}
					className={st.remove}
					title="Удалить"
				>
					<IoIosRemoveCircle size="25" />
					{/* <CgFileRemove size="25" /> */}
				</button>
			</div>
		</>
	)
}

export default File
