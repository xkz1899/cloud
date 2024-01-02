import st from "./Loading.module.scss"

const Loading = () => {
	return (
		<div className={st.lds__facebook}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loading
