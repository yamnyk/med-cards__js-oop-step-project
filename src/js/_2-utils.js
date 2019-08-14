class Utils {
	static generateId () {
		return `f${(+new Date).toString(16)}`;
	}
	
	static saveToStorage(object) {
		const storage = JSON.parse(localStorage.getItem('visits')) || [];
		storage.push(object);
		localStorage.setItem('visits', JSON.stringify(storage));
	}
	
	static serializeIntoVisit(object, docName) {
		switch (docName) {
			case DOCTOR_DENTIST:
				const serializedDentistVisit = new Dentist(
					new Date(object.lastVisit),
					object.clientName,
					object.visitGoal
				);
				serializedDentistVisit.id = object.id;
				serializedDentistVisit.date = new Date(object.date);
				
				return serializedDentistVisit;
				
			case DOCTOR_THERAPIST:
				const serializedTherapistVisit = new Therapist(
					object.visitGoal,
					object.age,
					object.clientName
				);
				serializedTherapistVisit.id = object.id;
				serializedTherapistVisit.date = new Date(object.date);
				
				return serializedTherapistVisit;
				
			case DOCTOR_CARDIOLOGIST:
				const serializedCardiologistVisit = new Cardiologist(
					object.clientName,
					object.visitGoal,
					object.normalPressure,
					object.massIndex,
					object.illnesses
				);
				serializedCardiologistVisit.id = object.id;
				serializedCardiologistVisit.date = new Date(object.date);
				
				return serializedCardiologistVisit;
		}
	}
	
	static showModal (event) {
		const modalBg = document.querySelector('.modal-wrapper');
		const docSelect = document.querySelector('#docSelect');
		const visitDate = document.querySelector('#visitDate');
		const optionalFieldsContainer = document.querySelector('.optional-fields');
		const cardForm = document.querySelector('.new-card');
		
		modalBg.style.display = 'flex';
		
		document.querySelector('#modalClose').onclick = () => {
			modalBg.style.display = 'none';
		};
		
		docSelect.addEventListener('change',  (e) => {
			switch (e.currentTarget.value) {
				case DOCTOR_DENTIST:
					Dentist.showFields(optionalFieldsContainer);
					break;
				case DOCTOR_THERAPIST:
					Therapist.showFields(optionalFieldsContainer);
					break;
				case DOCTOR_CARDIOLOGIST:
					Cardiologist.showFields(optionalFieldsContainer);
					break;
			}
		}, true);
		
		cardForm.addEventListener('submit', (event) => {
			event.preventDefault();
			
			switch (docSelect.value) {
				case DOCTOR_DENTIST:
					Utils.saveToStorage(
						new Dentist(
							document.querySelector('#lastVisit').value,
							document.querySelector('#clientName').value,
							document.querySelector('#visitGoalSelect').value,
							visitDate.value
						)
					);
					break;
				case DOCTOR_THERAPIST:
					Utils.saveToStorage(
						new Therapist(
							document.querySelector('#visitGoalSelect').value,
							document.querySelector('#clientAge').value,
							document.querySelector('#clientName').value,
							visitDate.value
						)
					);
					break;
				case DOCTOR_CARDIOLOGIST:
					Utils.saveToStorage(
						new Cardiologist(
							document.querySelector('#clientName').value,
							document.querySelector('#visitGoalSelect').value,
							document.querySelector('#normalPressure').value,
							document.querySelector('#massIndex').value,
							document.querySelector('#illnesses').value,
							visitDate.value
						)
					);
					break;
			}
			cardForm.reset();
			optionalFieldsContainer.innerHTML = '';
			modalBg.style.display = 'none';
			Utils.renderCards()
		})
		
	};
	
	static renderCards(cardContainerClassName = 'cards') {
		const fragment = document.createDocumentFragment();
		const cardsContainer = document.querySelector(`.${cardContainerClassName}`);
		let storage = JSON.parse(localStorage.getItem('visits')) || [];
		
		cardsContainer.innerHTML = '';
		
		if(!storage.length) {
			const noItemsText = document.createElement('h2');
			noItemsText.classList.add('cards__no-items');
			noItemsText.innerText = 'No Cards yet';
			cardsContainer.appendChild(noItemsText);
			return;
		}
		
		storage.forEach((card) => {
			const cardNode = document.createElement('div');
			const clientName = document.createElement('p');
			const docName = document.createElement('p');
			const visitDate = document.createElement('p');
			const showMore = document.createElement('button');
			const closeBtn = document.createElement('img');
			
			closeBtn.setAttribute('src', 'img/close-btn.png');
			closeBtn.setAttribute('alt', 'close');
			closeBtn.classList.add('close-btn');
			
			cardNode.dataset.cardId = card.id;
			
			cardNode.classList.add('card-item');
			clientName.classList.add('card-item__client-name');
			docName.classList.add('card-item__doctor');
			showMore.classList.add('card-item__more');
			visitDate.classList.add('card-item__date');
			
			clientName.innerText = card.clientName;
			docName.innerText = this.constIntoName(card.docName);
			showMore.innerText = 'Show more';
			visitDate.innerText = this.dateConverter(new Date(card.date));
			
			showMore.onclick = (event) => {
				const cardID = event.target.parentNode.dataset.cardId;
				const visit = Utils.serializeIntoVisit(storage.find(el => el.id === cardID), card.docName);
				console.log(visit);
				Utils.showMoreModal(visit);
			};
			
			cardNode.appendChild(closeBtn);
			cardNode.appendChild(clientName);
			cardNode.appendChild(docName);
			cardNode.appendChild(showMore);
			
			cardNode.onmousedown = (e) => {
				const cardY = cardNode.getBoundingClientRect().top + pageYOffset;
				const cardX = cardNode.getBoundingClientRect().left + pageXOffset;
				const shiftX = e.pageX - cardX;
				const shiftY = e.pageY - cardY;
				
				function moveAt(e) {
					cardNode.style.left = e.pageX - shiftX + 'px';
					cardNode.style.top = e.pageY - shiftY + 'px';
				}
				
				cardNode.style.position = 'absolute';
				moveAt(e);
				
				document.onmousemove = function(e) {
					moveAt(e);
				};
				
				cardNode.onmouseup = function() {
					document.onmousemove = null;
					cardNode.onmouseup = null;
				};
				
			};
			
			cardNode.ondragstart = function() {
				return false;
			};
			
			fragment.appendChild(cardNode);
		});
		
		cardsContainer.appendChild(fragment);
	}
	
	static constIntoName(constantVariable) {
		switch (constantVariable) {
			case DOCTOR_CARDIOLOGIST:
				return 'Cardiologist';
			case DOCTOR_THERAPIST:
				return 'Therapist';
			case DOCTOR_DENTIST:
				return 'Dentist';
			case GOAL_CHECKUP:
				return 'Regular health check';
			case GOAL_RECHECK:
				return "Doctor's reappointment";
			case GOAL_SICKNESS:
				return "I think I'm sick";
			default:
				return constantVariable;
		}
	}
	
	static deleteCard(cardNode) {
		const cardID = cardNode.dataset.cardId;
		let storage = JSON.parse(localStorage.getItem('visits'));
		storage = storage.filter(card => card.id !== cardID);
		
		localStorage.setItem('visits', JSON.stringify(storage));
		
		cardNode.remove();
	}
	
	static showMoreModal(visit) {
		const modalWrapper = document.createElement('div');
		const modal = document.createElement('div');
		const closeBtn = document.createElement('img');
		const clientName = document.createElement('h2');
		const visitDate = document.createElement('span');
		const docName = document.createElement('p');
		
		closeBtn.setAttribute('src', 'img/close-btn.png');
		closeBtn.setAttribute('alt', 'close');
		closeBtn.onclick = () => modalWrapper.style.display = 'none';
		closeBtn.classList.add('close-btn');
		
		clientName.innerText = visit.clientName;
		visitDate.innerText = this.dateConverter(visit.date);
		docName.innerText = this.constIntoName(visit.docName);
		
		modalWrapper.classList.add('modal-wrapper');
		modalWrapper.style.display = 'flex';
		modal.classList.add('modal');
		
		modal.appendChild(closeBtn);
		modal.appendChild(clientName);
		modal.appendChild(visitDate);
		modal.appendChild(docName);
		
		for (let field in visit) {
			if(field !== 'docName'
				&& field !== 'date'
				&& field !== 'clientName'
				&& field !== 'id'
			) {
				const fieldWrap = document.createElement('div');
				const label = document.createElement('span');
				const fieldVal = document.createElement('p');
				
				label.innerText = field;
				fieldVal.innerText = this.constIntoName(visit[field]);
				
				fieldWrap.appendChild(label);
				fieldWrap.appendChild(fieldVal);
				modal.appendChild(fieldWrap);
			}
		}
		
		modalWrapper.appendChild(modal);
		
		document.querySelector('.modal-wrapper').after(modalWrapper);
	}
	
	static dateConverter(date) {
		return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
	}
}