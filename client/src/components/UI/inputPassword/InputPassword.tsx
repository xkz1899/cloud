import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import st from "./InputPassword.module.scss"

interface IInputPassword {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const InputPassword = ({ value, setValue }: IInputPassword) => {
	const [visible, setVisible] = useState(false)

	return (
		<div className={st.password}>
			<input
				type={visible ? "text" : "password"}
				className={st.input}
				value={value}
				placeholder="Введите пароль..."
				onChange={e => setValue(e.target.value)}
			/>
			<button
				tabIndex={-1}
				className={st.eye}
				onClick={() => setVisible(!visible)}
			>
				{visible ? (
					<AiFillEyeInvisible title="Скрыть" />
				) : (
					<AiFillEye title="Показать" />
				)}
			</button>
		</div>
	)
}

export default InputPassword
