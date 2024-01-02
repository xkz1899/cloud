import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../actions/authAction"
import { setError } from "../../store/reducers/authSlice"
import ButtonAuth from "./../../components/UI/buttonAuth/ButtonAuth"
import Container from "./../../components/UI/container/Container"
import InputEmail from "./../../components/UI/inputAuth/InputEmail"
import InputPassword from "./../../components/UI/inputPassword/InputPassword"
import Loading from "./../../components/UI/loading/Loading"
import { useAppDispatch, useAppSelector } from "./../../hooks/redux"
import st from "./Login.module.scss"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const nav = useNavigate()

	const dispatch = useAppDispatch()
	const { isLoading, error } = useAppSelector(state => state.authSlice)

	const loginClickHandler = () => {
		dispatch(login(email, password))
		email.length > 5 && password.length > 5 && nav("/")
	}

	useEffect(() => {
		dispatch(setError(null))
	}, [])

	return !isLoading ? (
		<Container>
			<div className={st.wrap}>
				<h3 className={st.title}>Вход</h3>
				{error && <p className={st.error}>{error}</p>}
				<div className={st.form}>
					<InputEmail value={email} setValue={setEmail} />
					<InputPassword value={password} setValue={setPassword} />
					<ButtonAuth click={loginClickHandler} text="Войти" />
				</div>
			</div>
		</Container>
	) : (
		<div className={st.wrap}>
			<Loading />
		</div>
	)
}

export default Login
