class Visit {
	#_name;
	#_date;
	#_clientName;
	
	constructor(name, date = new Date(), clientName = 'Anonumous') {
		this.#_name = name;
		this.#_date = date;
		this.#_clientName = clientName;
	}
	
	static showModal (event) {
		const modalBg = document.querySelector('.new-card-wrapper');
		const docSelect = document.querySelector('#docSelect');
		modalBg.style.display = 'flex';
		
		document.querySelector('#modalClose').onclick = () => {
			modalBg.style.display = 'none';
		};
		
		docSelect.addEventListener('change',  (e) => {
			switch (e.currentTarget.value) {
				case 'dentist':
					Dantist.showFields();
					break;
				case 'therapist':
					Therapist.showFields();
					break;
				case 'cardiologist':
					Cardiologist.showFields();
					break;
			}
		}, true);
		
	};
}

class Cardiologist extends Visit{
	#_visitGoal;
	#_normalPressure;
	#_massIndex;
	#_illneses;
	
	constructor (clientName, visitGoal = GOAL_CHECKUP, normalPressure, massIndex, illneses) {
		super(DOCTOR_CARDIO, new Date(), clientName);
		this.#_visitGoal = visitGoal;
		this.#_normalPressure = normalPressure;
		this.#_massIndex = massIndex;
		this.#_illneses = illneses;
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
	get illneses() {
		return this.#_illneses;
	}
	
	set illneses(value) {
		this.#_illneses = value;
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
	
	static showFields() {
		// console.log(Object.keys(this));
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