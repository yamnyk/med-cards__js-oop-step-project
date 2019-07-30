class Visit {
	#_docName;
	#_date;
	#_clientName;
	#_visitGoal;
	
	constructor(docName, date = new Date(), clientName = 'Anonumous', visitGoal = GOAL_CHECKUP) {
		this.#_docName = docName;
		this.#_date = date;
		this.#_clientName = clientName;
		this.#_visitGoal = visitGoal;
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
	#_normalPressure;
	#_massIndex;
	#_illnesses;
	
	constructor (clientName, visitGoal = GOAL_CHECKUP, normalPressure, massIndex, illnesses) {
		super(DOCTOR_CARDIO, new Date(), clientName, visitGoal);
		this.#_normalPressure = normalPressure;
		this.#_massIndex = massIndex;
		this.#_illnesses = illnesses;
	}
}

class Dentist extends Visit {
	#_lastVisit;
	
	constructor (lastVisit, clientName, visitGoal = GOAL_CHECKUP) {
		super(DOCTOR_DENTIST, new Date(), clientName, visitGoal);
		this.#_lastVisit = new Date(lastVisit);
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		
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
	#_age;
	
	constructor (visitGoal = GOAL_CHECKUP, age, clientName) {
		super(DOCTOR_THERAPIST, new Date(), clientName, visitGoal);
		this.#_age = age;
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		
		const lastVisit = document.createElement('input');
		const lastVisitLabel = document.createElement('label');
		lastVisit.type = 'date';
		lastVisit.placeholder = 'Last visit';
		
		lastVisitLabel.innerText = 'Last visit 2';
		lastVisitLabel.dataset.optionalFrom= 'dentist';
		lastVisitLabel.appendChild(lastVisit);
		
		optionalFields.appendChild(lastVisitLabel);
	}
}