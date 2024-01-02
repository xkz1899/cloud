import React from "react"
import st from "./Uploader.module.scss"
import { AiOutlineClose } from "react-icons/ai"
import UploadFile from "./UploadFile"
import { useAppSelector } from "../../hooks/redux"
import { useAppDispatch } from "./../../hooks/redux"
import { setVisibleUploader } from "../../store/reducers/uploadSlice"

const Uploader = () => {
	const { isVisible, files } = useAppSelector(state => state.uploadSlice)
	const dispatch = useAppDispatch()

	return isVisible ? (
		<div className={st.main}>
			<div className={st.header}>
				<div className="">Загрузка</div>
				<button
					onClick={() => dispatch(setVisibleUploader(false))}
					className={st.close}
				>
					<AiOutlineClose size="15" />
				</button>
			</div>
			{files.map(file => (
				<UploadFile key={file.id} file={file} />
			))}
		</div>
	) : (
		<></>
	)
}

export default Uploader
