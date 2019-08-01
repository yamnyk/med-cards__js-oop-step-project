const createVisitBtn = document.querySelector('#createCardBtn');
const cardsWrapper = document.querySelector('.cards');
cardsWrapper.onclick = (event) => {
	if(event.target.classList.contains('close-btn')) {
		Utils.deleteCard(event.target.parentNode)
	}
};
Utils.renderCards();
createVisitBtn.onclick = Utils.showModal;

