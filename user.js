try {
	var school = Quizlet.siteNavData.mainSchool;
	var user = Quizlet.siteNavData.user;
	var info = {
		school: {
			name: school.name,
			city: school.city,
			state: school.state,
			country: school.country,
			long: school.longitude,
			lat: school.latitude
		 },
		 user: {
			birth: user.birthMonth + "/" + user.birthDay + "/" + user.birthYear,
			email: user.email,
			confirmed: user.isConfirmed,
			teacher: user.selfIdentifiedTeacherStatus,
			timezone: user.timeZone,
			name: user.username,
		}
	}
} catch(e) {
}