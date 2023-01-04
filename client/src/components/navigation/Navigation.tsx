import React from "react"
import Container from "../UI/container/Container"
import st from "./Navigation.module.scss"
import { BsFillCloudArrowDownFill } from "react-icons/bs"
import { BiUserCircle } from "react-icons/bi"
import { useAppSelector } from "../../hooks/redux"
import { useAppDispatch } from "./../../hooks/redux"
import { logout } from "./../../actions/authAction"
import { useNavigate, Link } from "react-router-dom"

const Navigation = () => {
	const { isAuth, currentUser } = useAppSelector(store => store.authSlice)
	const dispatch = useAppDispatch()
	const nav = useNavigate()

	return (
		<div className={st.background}>
			<Container>
				<div className={st.main}>
					<Link to="/" className={st.logo}>
						<BsFillCloudArrowDownFill size="40" />
						<h3>Cloud</h3>
					</Link>
					<div className={st.auth}>
						{isAuth ? (
							<div>
								<button>{currentUser.email}</button>
								{currentUser.avatar ? (
									<img src={currentUser.avatar} alt="Photo" />
								) : (
									<BiUserCircle />
								)}
								<button onClick={e => dispatch(logout())}>Выйти</button>
							</div>
						) : (
							<>
								<Link to="/login">Войти</Link>
								<Link to="/registration">Регистрация</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Navigation
