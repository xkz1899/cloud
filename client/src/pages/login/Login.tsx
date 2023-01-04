import React, { useState } from "react"
import st from "./Login.module.scss"
import Container from "./../../components/UI/container/Container"
import { useAppDispatch } from "./../../hooks/redux"
import { login } from "../../actions/authAction"
import { useNavigate } from "react-router-dom"
import Input from "../../components/UI/inputAuth/InputAuth"

const Login = () => {
	const [email, setEmail] = useState("xkz@gmail.com")
	const [password, setPassword] = useState("password")
	const dispatch = useAppDispatch()
	const nav = useNavigate()

	const loginClickHandler = () => {
		dispatch(login(email, password))
		nav("/")
	}

	return (
		<Container>
			<div className={st.main}>
				<div className={st.sub}>
					<h1 className={st.title}>Авторизация</h1>
					<div className={st.auth}>
						<Input
							type="email"
							placeholder="Введите e-mail..."
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
						/>
						<Input
							type="password"
							placeholder="Введите пароль..."
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
						/>
						<button onClick={loginClickHandler} className={st.btn}>
							Войти
						</button>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Login
