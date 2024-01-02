import React, { useState } from "react"
import { createDir } from "../../actions/fileAction"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import st from "./CreateDir.module.scss"

interface ICreateDir {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDir = ({ setVisible }: ICreateDir) => {
	const [value, setValue] = useState("")
	const dispatch = useAppDispatch()
	const { currentDir } = useAppSelector(state => state.fileSlice)
	const [err, setErr] = useState(false)

	const createDirClickHandler = () => {
		if (value) {
			dispatch(createDir(value, currentDir))
			setValue("")
			setErr(false)
			setVisible(false)
		} else {
			setErr(true)
		}
	}

	return (
		<div className={st.main}>
			{err && <h4 className={st.err}>Поле не может быть пустым</h4>}
			<input
				type="text"
				placeholder="Название папки..."
				autoFocus={true}
				className={st.input}
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyUp={e => e.key === "Enter" && createDirClickHandler()}
			/>
			<button className={st.btn} onClick={createDirClickHandler}>
				Создать
			</button>
		</div>
	)
}

export default CreateDir
