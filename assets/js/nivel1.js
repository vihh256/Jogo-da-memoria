const cards = document.querySelectorAll('.card')

let hasFlippedCard = false;
let lockBoard = false //funcao que corrige o bug
let firstCard, secondCard

/* Funçao para virar a carta */
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip')
    
    if(!hasFlippedCard) {
        //primeiro click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
        //segundo click
        secondCard = this;

        correspondencia();
    }

/* Funçao para ver se as cartas correspondem */
function correspondencia(){
    let match = firstCard.dataset.framework === secondCard.dataset.framework
/* 
Expressao regular */
    match ? desabilitarCards() : cardNaoVirados();
    
/* comparando as cartas
if() {
    //cartas iguais
        desabilitarCards();
    }
       else{
    //cartas diferentes
        cardNaoVirados();
            } */
}

/* Funçao que desabilita as cartas depois de viradas */
function desabilitarCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    }


    /* Funçao que desvira a carta depois de clicar e dar errado */
function cardNaoVirados() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 500);

    lockBoard = false
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}


/*     Funçao que embaralha as cartas */
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
