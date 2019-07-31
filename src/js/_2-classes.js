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
	
	static generateId () {
		return `f${(+new Date).toString(16)}`;
	}
	
	static showModal (event) {
		const modalBg = document.querySelector('.new-card-wrapper');
		const docSelect = document.querySelector('#docSelect');
		const optionalFieldsContainer = document.querySelector('.optional-fields');
		const cardForm = document.querySelector('.new-card');
		
		modalBg.style.display = 'flex';
		
		document.querySelector('#modalClose').onclick = () => {
			modalBg.style.display = 'none';
		};
		
		docSelect.addEventListener('change',  (e) => {
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
		
		cardForm.addEventListener('submit', (event) => {
			event.preventDefault();
			
			switch (docSelect.value) {
				case 'dentist':
					const newDentistVisit = new Dentist(
						document.querySelector('#lastVisit').value,
						document.querySelector('#clientName').value,
						document.querySelector('#visitGoalSelect').value
					);
					cardForm.reset();
					Visit.saveToStorage(newDentistVisit);
					break;
				case 'therapist':
					break;
				case 'cardiologist':
					break;
			}
		})
		
	};
	
	static saveToStorage(object) {
		const storage = JSON.parse(localStorage.getItem('visits')) || [];
		storage.push(object);
		localStorage.setItem('visits', JSON.stringify(storage));
	}
}

class Cardiologist extends Visit{
	id;
	#_normalPressure;
	#_massIndex;
	#_illnesses;
	
	constructor (clientName, visitGoal = GOAL_CHECKUP, normalPressure, massIndex, illnesses) {
		super(DOCTOR_CARDIO, new Date(), clientName, visitGoal);
		this.id = Visit.generateId();
		this.#_normalPressure = normalPressure;
		this.#_massIndex = massIndex;
		this.#_illnesses = illnesses;
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		const wrap = document.createDocumentFragment();
		
		const normalPressure = document.createElement('input');
		const massIndex = document.createElement('input');
		const illnesses = document.createElement('input');
		
		normalPressure.placeholder = 'Normal pressure';
		massIndex.type = 'number';
		massIndex.placeholder = 'Mass index';
		illnesses.placeholder = 'Enter your illnesses';
		
		massIndex.setAttribute('required', true);
		normalPressure.setAttribute('required', true);
		
		normalPressure.classList.add('new-card__text-input');
		massIndex.classList.add('new-card__text-input');
		illnesses.classList.add('new-card__text-input');
		
		wrap.appendChild(normalPressure);
		wrap.appendChild(massIndex);
		wrap.appendChild(illnesses);
		
		optionalFields.dataset.optionalFrom= 'cardiologist';
		
		optionalFields.appendChild(wrap);
	}
}

class Dentist extends Visit {
	id;
	#_lastVisit;
	
	constructor (lastVisit, clientName, visitGoal = GOAL_CHECKUP) {
		super(DOCTOR_DENTIST, new Date(), clientName, visitGoal);
		this.id = Visit.generateId();
		this.#_lastVisit = new Date(lastVisit);
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		
		const lastVisit = document.createElement('input');
		const lastVisitLabel = document.createElement('label');
		lastVisit.type = 'date';
		lastVisit.id = 'lastVisit';
		lastVisit.placeholder = 'Last visit';
		lastVisit.setAttribute("required","true");
		lastVisit.classList.add('new-card__text-input');
		
		lastVisitLabel.innerText = 'Last visit';
		lastVisitLabel.appendChild(lastVisit);
		
		optionalFields.dataset.optionalFrom = 'dentist';
		optionalFields.appendChild(lastVisitLabel);
	}
}

class Therapist extends Visit {
	id;
	#_age;
	
	constructor (visitGoal = GOAL_CHECKUP, age, clientName) {
		super(DOCTOR_THERAPIST, new Date(), clientName, visitGoal);
		this.id = Visit.generateId();
		this.#_age = age;
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		
		const age = document.createElement('input');
		
		age.type = 'number';
		age.placeholder = 'Age';
		age.classList.add('new-card__text-input');
		
		optionalFields.dataset.optionalFrom = 'therapist';
		
		optionalFields.appendChild(age);
	}
}