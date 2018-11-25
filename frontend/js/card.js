'use strict';

// Data structure representing a single card.
class Card {
  constructor(content) {
    // The content on the card.
    //
    // For now, this is just the text that is shown on the card.
    this.content = content;

    // Whether the card is currently flipped over.
    this.isFlipped = false;
  }

  // Checks whether this card matches another card.
  matches(card) {
    return this.content === card.content;
  }
}
