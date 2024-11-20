const SHAPE = ["DIAMOND","OVAL" ,"SQUIGGLE"];
const COLOR = ["RED", "GREEN", "BLUE"];
const NUMBER = [1, 2, 3];
const SHADING = ["OPEN","STRIPPED","SOLID"];

function createDeck() {
    const deck = [];
    let index = 0;

    for (let i = 0; i < SHAPE.length; i++) {
        for (let k = 0; k < NUMBER.length; k++) {
            for (let j = 0; j < COLOR.length; j++) {
                for (let l = 0; l < SHADING.length; l++) {
                    index++;
                    deck.push({
                        shape: SHAPE[i],
                        color: COLOR[j],
                        number: NUMBER[k],
                        shading: SHADING[l],
                        index: index,
                        imagePath: `images/${index}.png`
                    });
                }
            }
        }
    }


    shuffle(deck);
    return deck;
}

function isSet(card1, card2, card3) {
    let check_shape = (card1.shape === card2.shape && card2.shape === card3.shape && card1.shape === card3.shape) ||
        (card1.shape !== card2.shape && card2.shape !== card3.shape && card1.shape !== card3.shape);
    let check_color = (card1.color === card2.color && card2.color === card3.color && card1.color === card3.color) ||
        (card1.color !== card2.color && card2.color !== card3.color && card1.color !== card3.color);
    let check_number = (card1.number === card2.number && card2.number === card3.number && card1.number === card3.number) ||
        (card1.number !== card2.number && card2.number !== card3.number && card1.number !== card3.number);
    let check_shading = (card1.shading === card2.shading && card2.shading === card3.shading && card1.shading === card3.shading) ||
        (card1.shading !== card2.shading && card2.shading !== card3.shading && card1.shading !== card3.shading);

    return check_shape && check_color && check_number && check_shading;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function dealCards(dealtCards, deck, count) {
    let retries = 0;
    const maxRetries = 500; // Limit to avoid infinite recursion
    let length = count - dealtCards.length;

    while (dealtCards.length < count && retries < maxRetries) {
        let tempCards = deck.splice(0, length); // Get only the cards needed to meet `count`
        dealtCards.push(...tempCards);

        if (checkCard(dealtCards)) {
            break; // Exit if a valid set is found
        } else {
            // Re-add dealt cards back to deck and retry
            deck.push(...tempCards);
            shuffle(deck);
            retries++;
            dealtCards.splice(-length, length); // Remove the dealt cards to try again
        }
    }

    if (retries === maxRetries) {
        console.warn("Max retries reached while dealing cards. It may be impossible to create a valid set with the remaining cards.");
    }

    return dealtCards;
}


function checkCard(dealtCards) {
    if (dealtCards.length < 3) {
        console.log("Not enough cards to form a set.");
        return false; // No possible set if fewer than 3 cards
    }

    for (let i = 0; i < dealtCards.length; i++) {
        for (let j = i + 1; j < dealtCards.length; j++) {
            for (let k = j + 1; k < dealtCards.length; k++) {
                if (isSet(dealtCards[i], dealtCards[j], dealtCards[k])) {
                    console.clear();
                    console.log(`Set found with indices: ${i+1}, ${j+1}, ${k+1}`);
                    return true; // A set is possible
                }
            }
        }
    }
    console.log("No sets are available.");
    return false; // No set found
}

function removeSet(dealtCards, card1, card2, card3) {
    [card1, card2, card3].forEach(card => {
        const index = dealtCards.indexOf(card);
        if (index > -1) dealtCards.splice(index, 1);
    });
}

export { createDeck, dealCards, removeSet, isSet, shuffle,checkCard };