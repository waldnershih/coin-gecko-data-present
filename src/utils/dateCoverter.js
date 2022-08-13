export const timestampToDatetime = timestamp => {
	const date = new Date(timestamp);
	return date.toLocaleString();
};

export const timestampToDate = timestamp => {
	const date = new Date(timestamp);
	return date.toLocaleDateString();
};

export const timestampToCustomisedDatetime = (timestamp, format) => {
	const date = new Date(timestamp);
	const month = monthToString(date.getMonth() + 1);
	const hour = hourToString(date.getHours());
	switch (format) {
		case 1:
			return `${hour}`;
		case 7:
			return `${date.getDate()}. ${month}`;
		case 30:
			return `${date.getDate()}. ${month}`;
		default:
			return `${hour}`;
	}
};

const monthToString = month => {
	switch (month) {
		case 1:
			return 'Jan';
		case 2:
			return 'Feb';
		case 3:
			return 'Mar';
		case 4:
			return 'Apr';
		case 5:
			return 'May';
		case 6:
			return 'Jun';
		case 7:
			return 'Jul';
		case 8:
			return 'Aug';
		case 9:
			return 'Sep';
		case 10:
			return 'Oct';
		case 11:
			return 'Nov';
		case 12:
			return 'Dec';
		default:
			return '';
	}
};

const hourToString = hour => {
	switch (hour) {
		case 0:
			return '12am';
		case 1:
			return '1am';
		case 2:
			return '2am';
		case 3:
			return '3am';
		case 4:
			return '4am';
		case 5:
			return '5am';
		case 6:
			return '6am';
		case 7:
			return '7am';
		case 8:
			return '8am';
		case 9:
			return '9am';
		case 10:
			return '10am';
		case 11:
			return '11am';
		case 12:
			return '12pm';
		case 13:
			return '1pm';
		case 14:
			return '2pm';
		case 15:
			return '3pm';
		case 16:
			return '4pm';
		case 17:
			return '5pm';
		case 18:
			return '6pm';
		case 19:
			return '7pm';
		case 20:
			return '8pm';
		case 21:
			return '9pm';
		case 22:
			return '10pm';
		case 23:
			return '11pm';
		default:
			return '';
	}
};
