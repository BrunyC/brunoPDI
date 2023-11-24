export enum UserPattern {
	USER_LOGIN = 'user.login',

	USER_AUTH = 'user.auth',

	USER_CREATE = 'user.createUser',

	USER_UPDATE = 'user.updateUser',

	PASSWORD_USER_UPDATE = 'user.passwordUserUpdate'
}

export enum CartPattern {
	GET_CART = 'cart.getCart',

	ADD_ITEM = 'cart.addItem',

	REMOVE_ITEM_FROM_CART = 'cart.removeCartItem',

	REMOVE_CART = 'cart.removeCart'
}

export enum LogPattern {
	GET_LOG = 'log.getLog',

	ADD_LOG = 'log.addLog'
}
