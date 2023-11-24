export class getStatusText {
	public static statusText(code): string {
		switch (code) {
			case 200:
				return 'Ok';
			case 201:
				return 'Created';
			case 400:
				return 'Fail';
			case 404:
				return 'Not Found';
			default:
				return '';
		}
	}
}
