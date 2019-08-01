class Visit {
	id;
	docName;
	date;
	clientName;
	visitGoal;
	
	constructor(docName, date = new Date(), clientName = 'Anonumous', visitGoal = GOAL_CHECKUP) {
		this.id = Utils.generateId();
		this.docName = docName;
		this.date = date;
		this.clientName = clientName;
		this.visitGoal = visitGoal;
	}
}

class Cardiologist extends Visit{
	normalPressure;
	massIndex;
	illnesses;
	
	constructor (clientName, visitGoal = GOAL_CHECKUP, normalPressure, massIndex, illnesses) {
		super(DOCTOR_CARDIOLOGIST, new Date(), clientName, visitGoal);
		this.normalPressure = normalPressure;
		this.massIndex = massIndex;
		this.illnesses = illnesses;
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		const wrap = document.createDocumentFragment();
		
		const normalPressure = document.createElement('input');
		const massIndex = document.createElement('input');
		const illnesses = document.createElement('input');
		
		normalPressure.id = 'normalPressure';
		massIndex.id = 'massIndex';
		illnesses.id = 'illnesses';
		
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
	lastVisit;
	
	constructor (lastVisit, clientName, visitGoal = GOAL_CHECKUP) {
		super(DOCTOR_DENTIST, new Date(), clientName, visitGoal);
		this.lastVisit = new Date(lastVisit);
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
	age;
	
	constructor (visitGoal = GOAL_CHECKUP, age, clientName) {
		super(DOCTOR_THERAPIST, new Date(), clientName, visitGoal);
		this.age = age;
	}
	
	static showFields(optionalFields) {
		optionalFields.innerHTML = '';
		
		const age = document.createElement('input');
		
		age.id = 'clientAge';
		
		age.type = 'number';
		age.placeholder = 'Age';
		age.classList.add('new-card__text-input');
		
		optionalFields.dataset.optionalFrom = 'therapist';
		
		optionalFields.appendChild(age);
	}
}