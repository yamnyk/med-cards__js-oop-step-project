class Utils {
	static generateId () {
		return `f${(+new Date).toString(16)}`;
	}
	
	static saveToStorage(object) {
		const storage = JSON.parse(localStorage.getItem('visits')) || [];
		storage.push(object);
		localStorage.setItem('visits', JSON.stringify(storage));
	}
}