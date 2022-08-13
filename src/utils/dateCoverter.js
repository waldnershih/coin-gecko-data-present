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
	return hour < 10 ? `0${hour}:00` : `${hour}:00`;
};
