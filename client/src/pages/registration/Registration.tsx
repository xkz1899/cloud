import React, { useState } from "react"
import st from "./Registration.module.scss"
import Container from "./../../components/UI/container/Container"
import { useAppDispatch } from "./../../hooks/redux"
import { useNavigate } from "react-router-dom"
import Input from "../../components/UI/inputAuth/InputAuth"
import { registration } from "./../../actions/authAction"

const Registration = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const dispatch = useAppDispatch()
	const nav = useNavigate()

	const registrationClickHandler = () => {
		dispatch(registration(email, password))
		nav("/")
	}

	return (
		<Container>
			<div className={st.main}>
				<div className={st.sub}>
					<h1 className={st.title}>Регистрация</h1>
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
						<button onClick={registrationClickHandler} className={st.btn}>
							Зарегистрироваться
						</button>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Registration
