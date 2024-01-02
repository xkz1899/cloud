import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputEmail from "../../components/UI/inputAuth/InputEmail"
import { setError } from "../../store/reducers/authSlice"
import { registration } from "./../../actions/authAction"
import ButtonAuth from "./../../components/UI/buttonAuth/ButtonAuth"
import Container from "./../../components/UI/container/Container"
import InputPassword from "./../../components/UI/inputPassword/InputPassword"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import st from "./Registration.module.scss"

const Registration = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { error } = useAppSelector(state => state.authSlice)
	const dispatch = useAppDispatch()
	const nav = useNavigate()

	const registrationClickHandler = () => {
		dispatch(registration(email, password))
		email.length > 5 && password.length > 5 && nav("/")
	}

	useEffect(() => {
		dispatch(setError(null))
	}, [])

	return (
		<Container>
			<div className={st.wrap}>
				<h3 className={st.title}>Регистрация</h3>
				{error && <p className={st.error}>{error}</p>}
				<div className={st.form}>
					<InputEmail value={email} setValue={setEmail} />
					<InputPassword value={password} setValue={setPassword} />
					<ButtonAuth click={registrationClickHandler} text="Войти" />
				</div>
			</div>
		</Container>
	)
}

export default Registration
