import st from "./ButtonAuh.module.scss"

interface IButtonAuth {
	text: string
	click: () => void
}

const ButtonAuth = ({ click, text }: IButtonAuth) => {
	return (
		<button className={st.btn} onClick={click}>
			{text}
		</button>
	)
}

export default ButtonAuth
