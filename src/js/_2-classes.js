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
			const optionalFieldsContainer = document.querySelector('.optional-fields');
			switch (e.currentTarget.value) {
				case 'dentist':
					Dentist.showFields(optionalFieldsContainer);
					break;
				case 'therapist':
					Therapist.showFields(optionalFieldsContainer);
					break;
				case 'cardiologist':
					Cardiologist.showFields(optionalFieldsContainer);
					break;
			}
		}, true);
		
	};
}

class Cardiologist extends Visit{
	#_visitGoal;
	#_normalPressure;
	#_massIndex;
	#_illnesses;
	
	constructor (clientName, visitGoal = GOAL_CHECKUP, normalPressure, massIndex, illnesses) {
		super(DOCTOR_CARDIO, new Date(), clientName);
		this.#_visitGoal = visitGoal;
		this.#_normalPressure = normalPressure;
		this.#_massIndex = massIndex;
		this.#_illnesses = illnesses;
	}
}

class Dentist extends Visit {
	#_lastVisit;
	
	constructor (lastVisit, clientName) {
		super(DOCTOR_DANTIST, new Date(), clientName);
		this.#_lastVisit = lastVisit
	}
	
	static showFields(optionalFields) {
		const lastVisit = document.createElement('input');
		const lastVisitLabel = document.createElement('label');
		lastVisit.type = 'date';
		lastVisit.placeholder = 'Last visit';
		
		lastVisitLabel.innerText = 'Last visit';
		lastVisitLabel.dataset.optionalFrom= 'dentist';
		lastVisitLabel.appendChild(lastVisit);
		
		optionalFields.appendChild(lastVisitLabel);
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
}