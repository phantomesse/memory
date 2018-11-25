'use strict';

// An in-memory database of all the connected players.
//
// Matches up random players to play against each other.
class PlayerDatabase {
  constructor() {
    // List of all connected players.
    this._connectedPlayers = [];

    // List of all matches (both ongoing and waiting for players to join).
    this._matches = [];
  }

  // Creates a new player and returns the Player object.
  createPlayer(playerName) {
    const player = new Player(playerName);
    this._connectedPlayers.push(player);
    return player;
  }

  // Adds a player to a match that is waiting for players and returns the Match
  // object.
  matchPlayer(player) {
    for (const match of this._matches) {
      if (match.canAddPlayer) {
        match.addPlayer(player);
        return match;
      }
    }

    // If player cannot be added into any matches, create a new match.
    const match = new Match();
    match.addPlayer(player);
  }
}
