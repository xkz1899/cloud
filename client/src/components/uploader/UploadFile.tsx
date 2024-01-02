import React from "react"
import st from "./UploadFile.module.scss"
import { AiOutlineClose } from "react-icons/ai"
import { FileUpload } from "./../../models/FileUpload"
import { useAppDispatch } from "./../../hooks/redux"
import { deleteUploadFile } from "../../store/reducers/uploadSlice"

interface IUploadFile {
	file: FileUpload
}

const UploadFile = ({ file }: IUploadFile) => {
	const dispatch = useAppDispatch()

	return (
		<div className={st.main}>
			<div className={st.name}>
				<h4>{file.name}</h4>
				<button
					className={st.close}
					onClick={() => dispatch(deleteUploadFile(file))}
				>
					<AiOutlineClose size="15" />
				</button>
			</div>
			<div>
				<div className={st.bar}>
					<h4 className={st.percent__number}>{file.progress}%</h4>
					<div
						style={{ width: file.progress + "%" }}
						className={st.percent}
					></div>
				</div>
			</div>
		</div>
	)
}

export default UploadFile
