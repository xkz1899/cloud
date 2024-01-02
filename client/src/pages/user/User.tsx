import React from "react"
import { AiFillDelete } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"
import { deleteAvatar } from "../../actions/fileAction"
import { useAppSelector } from "../../hooks/redux"
import { uploadAvatar } from "./../../actions/fileAction"
import Container from "./../../components/UI/container/Container"
import { useAppDispatch } from "./../../hooks/redux"
import st from "./User.module.scss"

const User = () => {
	const { currentUser } = useAppSelector(state => state.authSlice)
	const dispatch = useAppDispatch()

	const addAvatarClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		if (file) {
			currentUser.avatar && dispatch(deleteAvatar())
			dispatch(uploadAvatar(file[0]))
		}
	}

	return (
		<Container>
			<div className={st.main}>
				{currentUser.avatar ? (
					<img
						src={process.env.REACT_APP_API_URL + "/" + currentUser.avatar}
						className={st.avatar}
						alt=""
					/>
				) : (
					<BiUserCircle className={st.avatar} />
				)}
				<h3 className={st.email}>{currentUser.email}</h3>
				<div className={st.edit}>
					<label
						htmlFor="avatar-upload"
						className={st.upload__label}
						title="Изменить автар"
					>
						<FaEdit size="25" />
					</label>
					<input
						accept="image/*"
						type="file"
						id="avatar-upload"
						className={st.upload__input}
						onChange={addAvatarClickHandler}
					/>
					<button
						onClick={() => dispatch(deleteAvatar())}
						className={st.avatar__delete}
						title="Удалить автар"
					>
						<AiFillDelete size="25" />
					</button>
				</div>
			</div>
			<h1>{/* {}/{sizeFormat(currentUser.diskSpace)} */}</h1>
		</Container>
	)
}

export default User
