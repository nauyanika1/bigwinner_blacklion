const debug = require("debug")("test");
const db = require("../config/db.js");
const moment = require('moment'); 
const bcrypt = require('bcrypt');
const {sendResponse,isValidArray} = require('./AppService');

//-----------------Common points function---------------------------------------------
	async function userById(playerId){
	    try{
	        let sql = `SELECT * FROM users WHERE user_id=? limit ?`;
		    let user = await db.query(sql,[playerId,1]);
	        return user;
	    } catch (err) {
	        debug(err);
	    }     
	}

	async function UserPoints(playerId){
		try{
			let points = 0;
			let sql = `SELECT * FROM user_points WHERE user_id=? limit ?`;
			let user = await db.query(sql,[playerId,1]);
			if(user.length>0) points = user[0].points;
		    return points;
	    } catch (err){
	        debug(err);
		}   
	}



	async function saveUserPoints(points,playerId){
		try{
			sql = `UPDATE user_points SET points= ? WHERE user_id= ? `;
	        let results  = await db.query(sql,[points,playerId]);
	        if(results.affectedRows === 1) return true;
		    else return false;
	    } catch (err){
	        debug(err);
		}   
	}

	async function UpdateUserPoints(playerId,points,distId=null){
		try{
			let user = await db.query(`SELECT * FROM user_points WHERE user_id=? limit ?`,[playerId,1]);
	        if(isValidArray(user)){
	        	let userPoints = user[0].points;
		    	let updateBal = userPoints + points;
	        	let result = await saveUserPoints(updateBal,playerId)
	        	return result
	        } else {
	        	let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	        	let sql = `INSERT INTO user_points (distributor_id,user_id,points,created_at) VALUES (?,?,?,?)`;
		        let results = await db.query(sql,[distId,playerId,points,date]);
		        if(results.affectedRows === 1) return true;
		        else return false
	        }

	    } catch (err){
	        debug(err);
		}     
	}


	async function createUserPointsID(playerId,points,distId){
		try{
			let user = await db.query(`SELECT * FROM user_points WHERE user_id=? limit ?`,[playerId,1]);
	        if(!isValidArray(user)){
	        	let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	        	let sql = `INSERT INTO user_points (distributor_id,user_id,points,created_at) VALUES (?,?,?,?)`;
		        let results = await db.query(sql,[distId,playerId,points,date]);
		        if(results.affectedRows === 1) return true;
		        else return false
	        } 
	        return true;
	    } catch (err){
	        debug(err);
		}     
	}
/*
	async function distributerPoints(distId){
		try{
			let points = 0;
			let sql = `SELECT * FROM distributor_points WHERE distributor_id=? limit ?`;
			let dist = await db.query(sql,[distId,1]);
			if(dist.length>0) points = dist[0].points;
		    return points;
	    } catch (err){
	        debug(err);
		}   
	}



	async function saveDistPoints(points,distId){
		try{
			sql = `UPDATE distributor_points SET points= ? WHERE distributor_id= ? `;
	        let results  = await db.query(sql,[points,distId]);
	        if(results.affectedRows === 1) return true;
		    else return false;
	    } catch (err){
	        debug(err);
		}   
	}
//-----------------END ----------------------------------------------------------------

*/







//------------Notification List(transfer or receive) socket event-----------------------------

	const userNotification = async(req) => {
	    let message;
		let status =404;
		let data = {};
	    try{	
		   const{user_id} = req;
		   let checkUser = await userById(user_id);
		   if(checkUser.length === 0) return sendResponse(status,"Invalid User.",data);

		   let sql = 'SELECT `id`,`sender`,`reciever`,`points`,`created_at` FROM `user_notification` WHERE reciever=? AND status=? AND user_read=?';
		   let userNotify = await db.query(sql,[user_id,1,1]);

		   let notification = (isValidArray(userNotify)) ? userNotify : null;
		   let notification_count = userNotify.length;

		   status  = 200;
	       message = 'User Notification';
	       data    = {notification,notification_count}
	       return sendResponse(status,message,data);

		  
		} catch (err){
	            debug(err);
		}   
	}


	const senderNotification = async(req) => {
	    let message;
		let status =404;
		let data = {};
	    try{	
		   const{user_id} = req;
		   let checkUser = await userById(user_id);
		   if(checkUser.length === 0) return sendResponse(status,"Invalid User.",data);

		   let sql = 'SELECT `id`,`sender`,`reciever`,`points`,`created_at` FROM `user_notification` WHERE sender=? AND status=? AND user_read=?';
		   let userNotify = await db.query(sql,[user_id,1,1]);

		   let notification = (isValidArray(userNotify)) ? userNotify : null;
		   let notification_count = userNotify.length;

		   status  = 200;
	       message = 'Sender Notification';
	       data    = {notification,notification_count}
	       return sendResponse(status,message,data);

		  
		} catch (err){
	            debug(err);
		}   
	}

//------------END------------------------------------------------------------------










//-----------------------SEND POINTS SOCKET EVENT------------------------------------
	const AddUserNotification = async(sender,reciever,points) => {
		let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
		let sql = `INSERT INTO user_notification (sender,reciever,points,status,created_at) VALUES (?,?,?,?,?)`;
		let results = await db.query(sql,[sender,reciever,points,1,date]);
		if(results.affectedRows === 1) return true;
		else return false;
	}	

/*
	const AddUserReturnNotification = async(dist,user,points) => {
		let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
		let sql = `INSERT INTO user_return_points (distributor_id,user_id,return_points,created_at) VALUES (?,?,?,?)`;
		let results = await db.query(sql,[dist,user,points,date]);
		if(results.affectedRows === 1) return true;
		else return false;
	}	

	async function AddDistNotification(sender,reciever,points,status){
		try{
			let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
			let sql = `INSERT INTO distributor_notification (sender,reciever,points,status,created_at) VALUES (?,?,?,?,?)`;
		    let results = await db.query(sql,[sender,reciever,points,status,date]);
		    if(results.affectedRows === 1) return true;
		    else return false;
		} catch (err){
	            debug(err);
		}     	
	}
*/

	const AddUserPoint = async(req) => {
	    let message;
		let status =404;
		let data = {};
	    try{	
		   let{sender,reciever,points,password} = req;
		   sender = sender.toUpperCase();
		   reciever = reciever.toUpperCase();

		   if(!sender || !reciever || !points || !password ) return sendResponse(status,"Invalid details.",data)
		  
		   let checkSender = await userById(sender);
		   
		   if(sender === reciever ) return sendResponse(status,"sender and reciever not be same .",data);

		   if(checkSender.length === 0 ) return sendResponse(status,"Sender Not Exist.",data);

		    let sendDist = checkSender[0].distributor_id;
	        let sendPassword = checkSender[0].password;

		   	let currPswd = sendPassword.replace("$2y$", "$2a$");
		    let confirmPassword =  await bcrypt.compare(password, currPswd); 

		    if(!confirmPassword) return sendResponse(status,"Incorrect Password.",data);

		    let senderPoints = await UserPoints(sender);

		    if(senderPoints < points) return sendResponse(status,"Insufficient Points.",data);

			if(sendDist === reciever) {
				let addDistNotify = await AddDistNotification(sender,reciever,points,0);
				if(addDistNotify === false) return sendResponse(status,"Something Went Wrong...Points Not Returns",data);
				let checkUserReturn = await AddUserReturnNotification(reciever,sender,points);
				if(checkUserReturn === false) return sendResponse(status,"Points Not Returns",data);

				let distPoints = await distributerPoints(sendDist);
				if(distPoints === 0) return sendResponse(status,"Distributor Not Found.",data);
		    	let updateBal = distPoints + parseInt(points);
			    let saveBal = await saveDistPoints(updateBal,sendDist);
			} else {

				let checkReciever = await userById(reciever);
				if(checkReciever.length === 0 ) return sendResponse(status,"Reciever Not Exist.",data);
				let recDIst = checkReciever[0].distributor_id;
				if(sendDist !== recDIst) return sendResponse(status,"Distributor Is Different.",data)
				let sendNtfc = await AddUserNotification(sender,reciever,points);
			    if(sendNtfc != true) return sendResponse(status,"Something Went Wrong.....Points Not Send",data);
			}


			let updateBal = senderPoints - points;
			let saveBal = await saveUserPoints(updateBal,sender);

			if(saveBal != true) return sendResponse(status,"Something Went Wrong.....Points Not Send",data);

			status  = 200;
	        message = 'Points Transfer Successfully.';
	        return sendResponse(status,message,data);

		} catch (err){
	            debug(err);
		}   
	}
//-----------------------SEND POINTS SOCKET EVENT------------------------------------









//--------------------Accept And Reject  Points Socket Events----------------------------------------------
	const NotificationById = async(Id) => {
		let results = await db.query('SELECT * FROM `user_notification` WHERE id = ? Limit ?',[Id,1]);
		return results;
	}


	async function ChangeUserStatus(Id,status,read){
	    let results  = await db.query('UPDATE user_notification SET status= ?,user_read= ? WHERE id = ?',[status,read,Id]);
	    if(results.affectedRows === 1) return true;
	    else return false;
	}
/*
	async function ChangeDistStatus(Id,user_id,status){
	    let results  = await db.query('UPDATE distributor_notification SET status= ? WHERE id = ? AND reciever=? AND `status`=?',[status,Id,user_id,1]);
	    if(results.affectedRows === 1) return true;
	    else return false;
	}
*/
	async function AddUserPointsHistory(user_id,points,status){
		try{

			let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
			let pointsData =  await db.query('SELECT * FROM user_points WHERE user_id=? limit ?',[user_id,1]);
		    if(pointsData.length ===0) return false;
		    let Id = pointsData[0].id;
			let sql = `INSERT INTO user_points_history (user_points_id,points,status,created_at) VALUES (?,?,?,?)`;
		    let results = await db.query(sql,[Id,points,status,date]);
		    if(results.affectedRows === 1) return true;
		    else return false;

		} catch (err){
	            debug(err);
		}     	
	}

/*
	async function AddUserToUserPointHistory(sender,reciever,points,status){
		try{
			let sql = `INSERT INTO user_to_user_points_history (sender,reciever,points,status) VALUES (?,?,?,?)`;
		    let results = await db.query(sql,[sender,reciever,points,status]);
		    if(results.affectedRows === 1) return true;
		    else return false;

		} catch (err){
	            debug(err);
		}     	
	}

*/



	const accept_points = async(req) => {
	    let message;
		let status =404;
		let data = {};
	    try{	
		    let{user_id,notify_id} = req;
		    user_id = user_id.toUpperCase();

		    if(!user_id || !notify_id ) return sendResponse(status,"Invalid details.",data);

		    let user = await userById(user_id);
		    if(user.length === 0) return sendResponse(status,"Invalid User.",data);

		    let userNotify = await NotificationById(notify_id);

		    if(userNotify.length === 0) return sendResponse(status,"Notification Is Wrong one",data);

		    let dist_notify_id = userNotify[0].dist_notify_id;
		    let notifyStatus = userNotify[0].status;
		    let sender = userNotify[0].sender;
		    let reciever = userNotify[0].reciever;
		    let points = userNotify[0].points;
		    let dist_id = user[0].distributor_id


		    if(notifyStatus !==1 || user_id !==reciever ) return sendResponse(status,"Notification Is Wrong one",data);

		    let updatePoints =   await UpdateUserPoints(reciever,points,dist_id);

		    if(updatePoints !== true) return sendResponse(status," Something Went Wrong.....Points Not Add.",data);

		    if (sender === dist_id) {
		    	let change_status = 2;
	            let user_read = 0;
	            let userStatus = await ChangeUserStatus(notify_id,change_status,user_read);
	            let distStatus = await ChangeDistStatus(dist_notify_id,reciever,change_status)
	            let userHistory = await AddUserPointsHistory(reciever,points,'Accepted');
	            if(!userStatus || !distStatus || !userHistory ) return sendResponse(status,"Points Transfer Error.",data);
	        } else {
	        	let change_status = 2;
	            let user_read = 0;
	            let userStatus = await ChangeUserStatus(notify_id,change_status,user_read);
	            let UserToUserHistory = await AddUserToUserPointHistory(sender,reciever,points,'Accepted');
	            if(!userStatus || !UserToUserHistory ) return sendResponse(status,"Points Transfer Error.",data);
	        }

	        status  = 200;
	        message = 'Point Accepted Successfully.';
	        return sendResponse(status,message,data);

		} catch (err){
	            debug(err);
		}   
	}


	const reject_points = async(req) => {
	    let message;
		let status =404;
		let data = {};
	    try{	

		    let{user_id,notify_id} = req;

		    user_id = user_id.toUpperCase();

		    if(!user_id || !notify_id ) return sendResponse(status,"Invalid details.",data);
		    let user = await userById(user_id);
		    if(user.length === 0) return sendResponse(status,"Invalid User.",data);
		    let userNotify = await NotificationById(notify_id);
		    if(userNotify.length === 0) return sendResponse(status,"Notification Is Wrong one",data);

		    let dist_notify_id = userNotify[0].dist_notify_id;
		    let notifyStatus = userNotify[0].status;
		    let sender = userNotify[0].sender;
		    let reciever = userNotify[0].reciever;
		    let points = userNotify[0].points;
		    let dist_id = user[0].distributor_id


		    if(notifyStatus !==1 ) return sendResponse(status,"Notification Is Wrong one",data);

		    if (sender === dist_id) {
		    	let pointsId = await createUserPointsID(reciever,0,dist_id)
		    	let distPoints = await distributerPoints(dist_id);
		    	let updateBal = distPoints + points;
			    let saveBal = await saveDistPoints(updateBal,dist_id);
			    if(saveBal === false ) return sendResponse(status,"User Points Rejecting Error",data);
			    let change_status = 3;
	            let user_read = 0;
	            let userStatus = await ChangeUserStatus(notify_id,change_status,user_read);
	            let distStatus = await ChangeDistStatus(dist_notify_id,reciever,change_status)
	            let userHistory = await AddUserPointsHistory(reciever,points,'Rejected');
	            if(!userStatus || !distStatus || !userHistory ) return sendResponse(status,"Points Rejection Error.",data);

	        } else {
	        	let updatePoints =   await UpdateUserPoints(sender,points,dist_id);
		        if(updatePoints !== true) return sendResponse(status," Something Went Wrong.....Points Not Add.",data);
	        	let change_status = 3;
	            let user_read = 0;
	            let userStatus = await ChangeUserStatus(notify_id,change_status,user_read);
	            let UserToUserHistory = await AddUserToUserPointHistory(sender,reciever,points,'Rejected');
	            if(!userStatus || !UserToUserHistory ) return sendResponse(status,"Points Transfer Error.",data);
	        }

	        status  = 200;
	        message = 'Point Rejected Successfully.';
	        return sendResponse(status,message,data);

		} catch (err){
	            debug(err);
		}   
	}


	const return_points = async(req) => {
	    let message;
		let status =404;
		let data = {};
	    try{	
	        status  = 200;
	        message = 'Point Return Successfully.';
	        return sendResponse(status,message,data);

		} catch (err){
	            debug(err);
		}   
	}
//--------------------END-----------------------------------------------------------------------------------------	


module.exports = {userNotification,senderNotification,AddUserPoint,accept_points,reject_points}