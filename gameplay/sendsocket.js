const SendSocketToSvenUP = require("./Sevenup").GetSocket;
const SendSocketToDvT = require("./DragonVsTiger").GetSocket;
const SendSocketToTitali = require("./TitaliGame").GetSocket;
const SendSocketToLucky = require("./LuckyBall").GetSocket;
const SendSocketToRoulette = require("./Roulette").GetSocket;
const SendSocketToFunTareget = require("./FunTarget").GetSocket;
const SendSocketToTripleChance = require("./TripleChance").GetSocket;
const SendSocketToWheelOfFortune = require("./WheelOfFortune").GetSocket;
const SendSocketToPokerKing= require("./PokerKing").GetSocket;
const SendSocketToLuckyDice= require("./LuckyDice").GetSocket;




const SendSocketToAndarbhar = require("./Andarbhar").GetSocket;



function sendSocket(socket){
    SendSocketToSvenUP(socket)
    SendSocketToDvT(socket)
   SendSocketToAndarbhar(socket)
 SendSocketToTitali(socket)
 SendSocketToLucky(socket)
 
 SendSocketToTripleChance(socket)
 SendSocketToRoulette(socket)
 SendSocketToFunTareget(socket)
SendSocketToWheelOfFortune(socket)
SendSocketToPokerKing(socket)
SendSocketToLuckyDice(socket)



}

module.exports.sendSocket = sendSocket;