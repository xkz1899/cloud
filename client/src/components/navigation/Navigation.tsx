import { BiUserCircle } from "react-icons/bi"
import { BsFillCloudArrowDownFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"
import Container from "../UI/container/Container"
import { logout } from "./../../actions/authAction"
import { useAppDispatch } from "./../../hooks/redux"
import st from "./Navigation.module.scss"

const Navigation = () => {
	const { isAuth, currentUser } = useAppSelector(store => store.authSlice)
	const dispatch = useAppDispatch()

	return (
		<div className={st.background}>
			<Container>
				<div className={st.main}>
					<Link to="/" className={st.logo}>
						<BsFillCloudArrowDownFill size="40" />
						<h3 className={st.title}>Cloud</h3>
					</Link>
					<div className={st.auth}>
						{isAuth ? (
							<div className={st.user}>
								<Link to="/user">{currentUser.email}</Link>
								{currentUser.avatar ? (
									<img
										className={st.avatar}
										src={`http://localhost:5000/${currentUser.avatar}`}
										alt=""
									/>
								) : (
									<BiUserCircle className={st.avatar} size="28" color="#FFF" />
								)}
								<button className={st.leave} onClick={e => dispatch(logout())}>
									Выйти
								</button>
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
