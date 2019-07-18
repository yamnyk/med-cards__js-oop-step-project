class Visit {
	#_name;
	#_date;
	#_clientName;
	
	constructor(name, date = new Date(), clientName = 'Anonumous') {
		this.#_name = name;
		this.#_date = date;
		this.#_clientName = clientName;
	}
	
	get name() {
		return this.#_name;
	}
	
	set name(value) {
		this.#_name = value;
	}
	
	get date() {
		return this.#_date;
	}
	
	set date(value) {
		this.#_date = value;
	}
	
	get clientName() {
		return this.#_clientName;
	}
	set clientName(value) {
		this.#_clientName = value;
	}
}

class Cardiologist extends Visit{
	#_visitGoal;
	#_normalPressure;
	#_massIndex;
	
	constructor (clientName, visitGoal = GOAL_REGULAR, normalPressure, massIndex) {
		super(DOCTOR_CARDIO, new Date(), clientName);
		this.#_visitGoal = visitGoal;
		this.#_normalPressure = normalPressure;
		this.#_massIndex = massIndex;
	}
	
	get visitGoal() {
		return this.#_visitGoal;
	}
	
	set visitGoal(value) {
		this.#_visitGoal = value;
	}
	
	get normalPressure() {
		return this.#_normalPressure;
	}
	
	set normalPressure(value) {
		this.#_normalPressure = value;
	}
	
	get massIndex() {
		return this.#_massIndex;
	}
	set massIndex(value) {
		this.#_massIndex = value;
	}
}

class Dantist extends Visit {
	#_lastVisit;
	
	constructor (lastVisit, clientName) {
		super(DOCTOR_DANTIST, new Date(), clientName);
		this.#_lastVisit = lastVisit
	}
	
	get lastVisit() {
		return this.#_lastVisit;
	}
	set lastVisit(value) {
		this.#_lastVisit = value;
	}
}

class Therapist extends Visit {
	#_visitGoal;
	#_age;
	
	constructor (visitGoal, age, clientName) {
		super(DOCTOR_THERAPIST, new Date(), clientName);
		this.#_visitGoal = visitGoal;
		this.#_age = age;
	}
	
	get visitGoal() {
		return this.#_visitGoal;
	}
	
	set visitGoal(value) {
		this.#_visitGoal = value;
	}
	
	get age() {
		return this.#_age;
	}
	set age(value) {
		this.#_age = value;
	}
}