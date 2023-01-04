module.exports = class UserDto {
	id
	email
	avatar
	usedSpace
	diskSpace
	role
	constructor(model) {
		this.id = model.id
		this.email = model.email
		this.avatar = model.avatar
		this.usedSpace = model.used_space
		this.duskSpace = model.disk_space
		this.role = model.role
	}
}
