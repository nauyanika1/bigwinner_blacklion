"use strict";
const botsData = require("../jsonfiles/BotsProfileDetails.json");
const debug = require("debug")("test");
const fs = require("fs");
let bots = [];
let botDVT = [];
let botABH = [];
let botTitali = [];
let botLucky = [];
let botTripleChance = [];
let botRoulette = [];
let botFunTarget = [];
let botWheelOfFortune = [];
let botPokerKing = [];
let botLuckyDice = [];

let maxBots = 6;
let totalGames = 11;
LoadBots();

function GetBots(gameId) {
  switch (gameId) {
    case 1:
      return bots;
      break;
    case 2:
      return botDVT;
      break;
    case 3:
      return botABH;
      break;
    case 4:
      return botTitali;
      break;
    case 5:
      return botLucky;
      break;
    case 6:
      return botTripleChance;
      break;
    case 7:
      return botRoulette;
      break;
    case 8:
      return botFunTarget;
      break;
    case 9:
      return botWheelOfFortune;
      break;
    case 10:
      return botPokerKing;
      break;
    case 11:
      return botLuckyDice;
      break;
  }
}

function LoadBots() {
  for (let i = 1; i <= totalGames; i++) {
    let botArr = botsData.filter(
      (bot) => bot.gameId === i && bot.balance < 10000
    );
    botArr = botArr.slice(0, maxBots);
    botArr.sort(function (a, b) {
      return -a.balance + b.balance;
    });
    pushBots(botArr, i);
  }
  return;
}

function pushBots(botArr, gameId) {
  switch (gameId) {
    case 1:
      bots = botArr;
      break;
    case 2:
      botDVT = botArr;
      break;
    case 3:
      botABH = botArr;
      break;
    case 4:
      botTitali = botArr;
      break;
    case 5:
      botLucky = botArr;
      break;
    case 6:
      botTripleChance = botArr;
      break;
    case 7:
      botRoulette = botArr;
      break;
    case 8:
      botFunTarget = botArr;
      break;
    case 9:
      botWheelOfFortune = botArr;
      break;
    case 10:
      botPokerKing = botArr;
      break;
    case 11:
      botLuckyDice = botArr;
      break;
  }
  return;
}

function AddPlayer(data) {
  bots.push(data);
  bots.sort(function (a, b) {
    return -a.balance + b.balance;
  });
}

function RemovePlayer(data) {
  for (let i = 0; i < bots.length; i++) {
    if (bots[i].socketId === undefined) continue;
    if (bots[i].socketId === data.socketId) bots.splice(i, 1);
  }
  bots.sort(function (a, b) {
    return -a.balance + b.balance;
  });
}

function SuffleBots(gameId) {
  let botArr = botsData.filter((bot) => bot.gameId === gameId);
  botArr = shuffleArray(botArr);
  botArr = botArr.slice(0, maxBots);
  botArr.sort(function (a, b) {
    return -a.balance + b.balance;
  });
  pushBots(botArr, gameId);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

module.exports.AddPlayer = AddPlayer;
module.exports.RemovePlayer = RemovePlayer;
module.exports.GetBots = GetBots;
module.exports.LoadBots = LoadBots;
module.exports.SuffleBots = SuffleBots;
