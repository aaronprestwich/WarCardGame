// Object Deck
class Deck{
    constructor(deck){        
        this.suits = ['Diamonds','Spades','Clubs','Hearts']
        this.numbers = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']
        this.cards =[]
        this.shuffledCards =[]                       
    }
    createCards(){       
        // Suits: diamonds, spades, clubs, hearts.       
        for (let i = 0; i < this.suits.length; i++) {
           // Card numbers ranked lowest to highest  2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
            for (let j = 0; j < this.numbers.length; j++){
                let card = {card:`${this.numbers[j]} of ${this.suits[i]}`,rank: j};                
                this.cards.push(card);
            }            
        }
        // Adding in two jokers that are the highest rank.
        this.cards.push({card:'Joker 1',rank:13});
        this.cards.push({card:'Joker 2',rank:13});
        return this.cards;    
    }
    shuffleCards(deck){  
        this.shuffledCards = deck;        
        // Found Fisher-Yates Shuffle from 
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
        let currentCard = this.shuffledCards.length,  randomCard;
          
            // While there are cards to shuffle.
        while (currentCard != 0) {
          
            // Pick a remaining card. floor rounds down
            randomCard = Math.floor(Math.random() * currentCard);
            currentCard--;
          
              // Swap it with the current card.
            [this.shuffledCards[currentCard], this.shuffledCards[randomCard]] = 
            [this.shuffledCards[randomCard], this.shuffledCards[currentCard]];
        }          
        return this.shuffledCards;         
    }
}

// Function to determine the score. Returns score as an array.
function getScore(shuffled1Hand,shuffled2Hand){
    // Set the players scores to 0.
    let player1Score = 0;
    let player2Score = 0;

    // Each player plays their card and reveals who has the higher ranked card
while (shuffled1Hand.length != 0 || shuffled2Hand != 0) {
    let turn = 1;  
    let player1Card = shuffled1Hand.pop();       
    let player2Card = shuffled2Hand.pop();
    
    // Player 1 wins round in green text
        if (player1Card.rank > player2Card.rank) {            
        player1Score++; 
        console.log(`%cPlayer 1 played the ${player1Card.card}. Player 2 played the ${player2Card.card}.
        PLAYER 1 WON ROUND ${turn}.
        Player 1  Player 2
        ${player1Score}         ${player2Score}`,'color:green');       
        }
        // Player 2 wins round in red text
        else if (player2Card.rank > player1Card.rank){
            player2Score++;
            console.log(`%cPlayer 1 played the ${player1Card.card}. Player 2 played the ${player2Card.card}.
            PLAYER 2 WON ROUND ${turn}.
            Player 1  Player 2
            ${player1Score}         ${player2Score}`,'color:red');  
        }
        // It is a tie in blue text
        else{
            player1Score += 0;
            player2Score += 0;
            console.log(`%cPlayer 1 played the ${player1Card.card}. Player 2 played the ${player2Card.card}.
            ROUND ${turn} WAS A TIE!
            Player 1  Player 2
            ${player1Score}         ${player2Score}`,'color:blue');
        }
        // next turn
        turn++;
    }    
    // To return multiple variables, return as an array.
    return [player1Score, player2Score];
}
// Function to determine who is the winner.
function getWinner(player1Score, player2Score){
    if (player1Score > player2Score) {
        console.log(`Player 1 WON the WAR.           
        Player 1  Player 2
        ${player1Score}         ${player2Score}`);
        return 'Player 1 Won';
    }
    else{
        console.log(`Player 2 WON the WAR.           
        Player 1  Player 2
        ${player1Score}         ${player2Score}`);
        return 'Player 2 Won';
    }
}

function playWar(){
    // Create new Deck
    let deck = new Deck().createCards();
    
    // Shuffle the Deck
    let shuffledDeck = new Deck().shuffleCards(deck);
    console.log(shuffledDeck);
    // Found out about Math.ceil() from https://flaviocopes.com/how-to-cut-array-half-javascript/
    // Deals to each player by Splitting the deck in half rounding up to the nearest integer.
    let half = Math.floor(shuffledDeck.length/2);
    let player1Hand = shuffledDeck.slice(0, half);
    let player2Hand = shuffledDeck.slice(-half);

    // This is unnecessary, but both hands are shuffled to simulate dealing.
    let shuffled1Hand = new Deck().shuffleCards(player1Hand);
    let shuffled2Hand = new Deck().shuffleCards(player2Hand);    
    
    // Play through turns getting the final score. Returns score as an array
    let playerScores = getScore(shuffled1Hand,shuffled2Hand);
    let player1Score = playerScores[0];
    let player2Score = playerScores[1];

    // Determine who is the winner.
    return getWinner(player1Score, player2Score);    
}

playWar();
