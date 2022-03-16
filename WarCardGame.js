
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
        let currentIndex = this.shuffledCards.length,  randomIndex;
          
            // While there remain elements to shuffle...
        while (currentIndex != 0) {
          
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
          
              // And swap it with the current element.
            [this.shuffledCards[currentIndex], this.shuffledCards[randomIndex]] = 
            [this.shuffledCards[randomIndex], this.shuffledCards[currentIndex]];
        }          
        return this.shuffledCards;         
    }
}

function playWar(){
    // Create new Deck
    let deck = new Deck().createCards();
    
    // Shuffle the Deck
    let shuffledDeck = new Deck().shuffleCards(deck);

    // Found Math.ceil from https://flaviocopes.com/how-to-cut-array-half-javascript/
    // Deals to each player by Splitting the deck in half
    let half = Math.ceil(shuffledDeck.length/2);
    let player1Hand = shuffledDeck.slice(0, half);
    let player2Hand = shuffledDeck.slice(-half);

    // This is unnecessary, but both hands are shuffled.
    let shuffled1Hand = new Deck().shuffleCards(player1Hand);
    let shuffled2Hand = new Deck().shuffleCards(player2Hand);
    // Display each players' hand.
    console.log(player1Hand);
    console.log(player2Hand);
    
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
    // Determine who is the winner.
    if (player1Score > player2Score) {
        console.log(`Player 1 WON the WAR.           
            Player 1  Player 2
            ${player1Score}         ${player2Score}`);
        
    }
    else{
        console.log(`Player 2 WON the WAR.           
            Player 1  Player 2
            ${player1Score}         ${player2Score}`);
    }
}

playWar();
