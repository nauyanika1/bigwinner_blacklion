const debug = require("debug")("test");
const db = require("../config/db.js");


const changeStatus = async(status,playerId) => {
    try{
        sql = `UPDATE users SET is_login= ? WHERE id= ? `;
        let changeStatus = await db.query(sql,[status,playerId]);
        return;
    } catch (err) {
        console.log(err);
        debug(err);
    }     
}


function sendResponse(status,message,data) {
	return {
        status : (!status) ? 404 : status,
        message : message,
        data : data
	}
}


const  isValidArray = (arr) => {
    if(arr!=null && arr!=undefined && arr.length>0) {
        return true
    } else {
        return false
    }
}
 

function GetRandomNo(min, max) {// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}



function inArray(target, array){
	for(var i = 0; i < array.length; i++) {
	    if(array[i] === target) return true;
	}
	return false; 
}



function SumOfARRAY(array) {
    return array.reduce(function (a, b) { return a + b; }, 0);
}



function arrayValues(array,value) {
	let result = []
	for (let i = 0; i < array.length; i++) {
        if(array[i] === value) result.push(i);
    }
    return result;
}



function randNo(array){
	return array[Math.floor(Math.random() * array.length)];
}





module.exports = {
    changeStatus,
	sendResponse,
	isValidArray,
	GetRandomNo,
	inArray,
	SumOfARRAY,
	arrayValues,
	randNo,
};

