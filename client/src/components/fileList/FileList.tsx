import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import st from "./FileList.module.scss"
import File from "./../file/File"
import { useAppDispatch } from "./../../hooks/redux"
import { getFiles } from "../../actions/fileAction"
import { IoMdArrowDropup } from "react-icons/io"
import Loading from "./../UI/loading/Loading"

const FileList = () => {
	const { files, currentDir } = useAppSelector(state => state.fileSlice)
	const dispatch = useAppDispatch()
	const [sort, setSort] = useState(localStorage.getItem("sort") || "type")
	const { isLoading } = useAppSelector(state => state.appSlice)

	useEffect(() => {
		dispatch(getFiles(currentDir, sort))
	}, [currentDir, sort])

	const setSortClickHandler = (sort: string) => {
		setSort(sort)
		localStorage.setItem("sort", sort)
	}

	return !isLoading ? (
		files.length ? (
			<>
				<div className={st.main}>
					<p onClick={() => setSortClickHandler("name")} className={st.name}>
						Название
						{sort === "name" && <IoMdArrowDropup />}
					</p>
					<p onClick={() => setSortClickHandler("type")} className={st.type}>
						Тип
						{sort === "type" && <IoMdArrowDropup />}
					</p>
					<p onClick={() => setSortClickHandler("date")} className={st.date}>
						Дата
						{sort === "date" && <IoMdArrowDropup />}
					</p>
					<p className={st.size}>Размер</p>
				</div>
				{files.map(file => (
					<File key={file.id} file={file} />
				))}
			</>
		) : (
			<div className={st.background}>
				<p className={st.empty}>Файлов нет</p>
			</div>
		)
	) : (
		<div className={st.background}>
			<Loading />
		</div>
	)
}

export default FileList
