// This function returns a date string to display on top of the journal page

function getDate(param) {
	let d;
	if (arguments.length === 0) {
		d = new Date();
	} else {
		let params = param.split("-");
		console.log(params);
		d = new Date();
	}
	let day = d.getDay();
	let date = d.getDate();
	let month = d.getMonth();
	let year = d.getFullYear();
	switch (month) {
		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;
		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sep";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;
		default:
			month = "NaN";
			break;
	}

	switch (day) {
		case 0:
			day = "Sun";
			break;
		case 1:
			day = "Mon";
			break;
		case 2:
			day = "Tue";
			break;
		case 3:
			day = "Wed";
			break;
		case 4:
			day = "Thu";
			break;
		case 5:
			day = "Fri";
			break;
		case 6:
			day = "Sat";
			break;

		default:
			day = "NaN";
			break;
	}
	let out = day + " " + month + " " + String(date) + ", " + String(year);
	return out;
}

export default getDate;
