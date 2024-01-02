import st from "./InputEmail.module.scss"

interface IInputEmail {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const InputEmail = ({ value, setValue }: IInputEmail) => {
	return (
		<input
			type="email"
			className={st.email}
			placeholder="Введите e-mail..."
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	)
}

export default InputEmail
