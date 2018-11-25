'use strict';

// Data structure representing a player.
class Player {
  constructor(name) {
    this.name = name;

    // List of cards that this player currently sees.
    this._cards = [];
  }

  set cards(cards) {
    this._cards = cards;
  }
}
