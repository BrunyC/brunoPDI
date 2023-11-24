export class DateHelper {
	/**
	 * Return today in milliseconds
	 *
	 * @returns milliseconds: number
	 */
	public static Today(): number {
		return new Date().getTime();
	}

	/**
	 * Convert given datetime (yyyymmddhhmmss) pattern, to timestamp datetime.
	 *
	 * @returns timestamp: number
	 */
	public static Datetime(date: string): number {
		const year = parseInt(date.substring(0, 4));
		const month = parseInt(date.substring(4, 6)) - 1;
		const day = parseInt(date.substring(6, 8));
		const hour = parseInt(date.substring(8, 10));
		const minutes = parseInt(date.substring(10, 12));
		const seconds = parseInt(date.substring(12, 14));

		const timestamp = new Date(year, month, day, hour, minutes, seconds).getTime();

		return timestamp > 0 ? timestamp : 0;
	}
}
