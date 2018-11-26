'use strict';

const https = require('https');
const Player = require('./player.js');

// An in-memory database of all the connected players.
//
// Matches up random players to play against each other.
class PlayerDatabase {
  constructor() {
    // List of names that can be used for new players.
    this._unusedPlayerNames = new Set();
    this._updateUnusedPlayerNames();

    // List of all connected players.
    this._connectedPlayers = [];

    // List of all matches (both ongoing and waiting for players to join).
    this._matches = [];
  }

  // Creates a new player and returns the Player object.
  addPlayer() {
    // Get player name.
    const playerName = this._unusedPlayerNames.entries().next().value[0];

    // Remove player name from unused player names.
    this._unusedPlayerNames.delete(playerName);

    // Add more names to unused player names if there are less than 5 names
    // left.
    if (this._unusedPlayerNames.size < 5) this._updateUnusedPlayerNames();

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

  _updateUnusedPlayerNames() {
    const self = this;
    PlayerDatabase._getPlayerNames().then(function(response) {
        for (const name of response) {
          self._unusedPlayerNames.add(name);
        }
      },
      function(rejection) {
        console.log(rejection);
      });
  }

  static _getPlayerNames() {
    const url = 'https://animal-username.herokuapp.com?count=100';

    return new Promise(function(resolve, reject) {
      https.get(url, function(response) {
        response.on('data', function(data) {
          resolve(JSON.parse(data));
        });
      }).on('error', function(error) {
        reject(error);
      });
    });
  }
}

module.exports = new PlayerDatabase();
