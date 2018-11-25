'use strict';

// Maximum number of players that can be allowed in a match.
const _maxPlayerCount = 4;

// Data structure representing a match between multiple players.
class Match {
  constructor() {
    // List of players in the match.
    this._players = [];

    // Whether a match has been started or not.
    //
    // When a match has started, then no other players can join in the match.
    this.hasStarted = false;
  }

  // Checks whether a new player can be added.
  get canAddPlayer() =>
    !this.hasStarted && this._players.length < _maxPlayerCount;

  addPlayer(player) {
    assert(this.canAddPlayer);
    this._players.push(player);
  }
}
