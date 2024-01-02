import React, { useState } from "react"
import { AiOutlineCloudUpload, AiOutlineRollback } from "react-icons/ai"
import { MdOutlineCreateNewFolder } from "react-icons/md"
import Container from "../../components/UI/container/Container"
import Modal from "../../components/UI/modal/Modal"
import { popStackPath, setCurrentDir } from "../../store/reducers/fileSlice"
import { getFiles, searchFiles, uploadFile } from "./../../actions/fileAction"
import CreateDir from "./../../components/createDir/CreateDir"
import FileList from "./../../components/fileList/FileList"
import Uploader from "./../../components/uploader/Uploader"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import st from "./Disk.module.scss"

const Disk = () => {
	const { stackPath, currentDir } = useAppSelector(state => state.fileSlice)
	const dispatch = useAppDispatch()
	const [visibleDir, setVisibleDir] = useState(false)
	const [dragEvent, setDragEvent] = useState(false)
	const [search, setSearch] = useState("")
	const [searchTimeout, setSearchTimeout] = useState<any>(null)

	const backClickHandler = () => {
		dispatch(popStackPath())
		dispatch(setCurrentDir(stackPath[stackPath.length - 1]))
	}
	const uploadChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			for (let i = 0; i < files.length; i++) {
				dispatch(uploadFile(files[i], currentDir))
			}
		}
	}
	const dragEnterHandler = (e: React.DragEvent) => {
		e.preventDefault()
		setDragEvent(true)
	}
	const dragLeaveHandler = (e: React.DragEvent) => {
		e.preventDefault()
		setDragEvent(false)
	}
	const dropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault()
		e.stopPropagation()
		const files = (e.dataTransfer as DataTransfer).files
		if (files) {
			for (let i = 0; i < files.length; i++) {
				dispatch(uploadFile(files[i], currentDir))
			}
		}
		setDragEvent(false)
	}
	const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		if (searchTimeout !== null) {
			clearTimeout(searchTimeout)
		}
		if (e.target.value === "") {
			dispatch(getFiles(currentDir, localStorage.getItem("sort") ?? "type"))
		} else {
			setSearchTimeout(
				window.setTimeout(() => {
					dispatch(searchFiles(e.target.value, localStorage.getItem("sort") ?? "type"))
				}, 500)
			)
		}
	}

	return !dragEvent ? (
		<>
			<div
				className={st.background}
				onDragEnter={dragEnterHandler}
				onDragLeave={dragLeaveHandler}
			>
				<Container>
					<div className={st.nav}>
						<div>
							<button onClick={backClickHandler} className={st.back}>
								<AiOutlineRollback size="25" />
							</button>
							<button onClick={() => setVisibleDir(true)}>
								<MdOutlineCreateNewFolder size="25" />
							</button>
							<label htmlFor="upload" className={st.upload}>
								<AiOutlineCloudUpload size="25" />
							</label>
							<input
								multiple={true}
								id="upload"
								className={st.upload__input}
								type="file"
								onChange={uploadChangeHandler}
							/>
						</div>
						<input
							type="text"
							value={search}
							placeholder="Search..."
							className={st.search}
							onChange={searchChangeHandler}
						/>
					</div>
					<FileList />
					<Modal visible={visibleDir} setVisible={setVisibleDir}>
						<CreateDir setVisible={setVisibleDir} />
					</Modal>
					<Uploader />
				</Container>
			</div>
		</>
	) : (
		<>
			<input multiple={true} type="file" id="file" className={st.file} />
			<label
				htmlFor="file"
				onDragEnter={dragEnterHandler}
				onDragLeave={dragLeaveHandler}
				onDragOver={dragEnterHandler}
				onDrop={dropHandler}
				className={st.drag}
			>
				Перетащите файлы сюда.
			</label>
		</>
	)
}

export default Disk
