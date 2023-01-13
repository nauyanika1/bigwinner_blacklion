const bcrypt = require("bcrypt");
//const check = require('../validation/CheckValidation')
const conn = require("../config/db");
const moment = require("moment");
const { authToken } = require("../middleware/getToken");
// User login
var nodemailer = require("nodemailer");

//list of getPlayerDAta
const getPlayerData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  users`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getPlayerIdData = async (req, res) => {
  var playerid = "";
  const sql2 = `SELECT COUNT(*) as totalcount  FROM users`;
  const allusers = await conn.query(sql2);
  console.log("allusers:", allusers[0].totalcount);
  if (allusers[0].totalcount >= 0 && allusers[0].totalcount <= 9) {
    // playerid="RL0000"+(allusers[0].totalcount)
    playerid = "BW0000" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 1 &&
    allusers[0].totalcount / 10 <= 9
  ) {
    playerid = "BW000" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 10 &&
    allusers[0].totalcount / 10 <= 99
  ) {
    playerid = "BW00" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 100 &&
    allusers[0].totalcount / 10 <= 999
  ) {
    playerid = "BW0" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 1000 &&
    allusers[0].totalcount / 10 <= 9999
  ) {
    playerid = "BW" + allusers[0].totalcount;
  }
  console.log("playerId", playerid);
  statusCode = 200;
  message = "success";
  data = playerid;

  const responseData = {
    status: statusCode,
    message,
    data,
  };
  res.send(responseData);
};

const getPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT user.id,user.user_id,user.username,game_name.game_name FROM  user left join round_report on user.user_id=round_report.player_id left join game_name on round_report.game=game_name.id`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const LuckyDicegetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_luckydice ORDER BY created DESC  `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const WheelOfFortunegetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_wheeloffortune ORDER BY created DESC  `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PokergetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_pokerking ORDER BY created DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const TigerVsElephantgetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_dragon ORDER BY created DESC `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const LuckyBallgetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_lucky ORDER BY created DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const Transaction = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM transactions ORDER BY created DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointTransfer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointtransferred `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

//Playerpointhistory
const getPlayerPointHistory = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT user.id,user.user_id,user.username,game_record_dragon.game_id,game_record_dragon.created_at FROM user left join game_record_dragon on user.user_id=game_record_dragon.user_id`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agenot found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointReceive = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointtransferred `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointCancel = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointcanel `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointRejected = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointreject `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const GameReport = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM join_game `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const DailyStatus = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM daily_status`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const sendPoints = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  try {
    console.log(req.body, "Send data");
    const { role_id, user_id, distributor_id, stokez_id, points, passcode } =
      req.body;
    sql = `SELECT * FROM users WHERE LOWER(useremail)= ? limit ?`;
    responseData = await conn.query(sql, [distributor_id, 1]);
    if (responseData.length > 0) {
      sql = `SELECT * FROM users WHERE LOWER(useremail)= ? limit ?`;
      responseData = await conn.query(sql, [distributor_id, 1]);
      if (responseData.length > 0) {
        const tpoints = parseInt(points) + parseInt(responseData[0].point);
        sql = "UPDATE users SET point= ? WHERE useremail=?";
        const userss = await conn.query(sql, [tpoints, distributor_id]);
        if (userss) {
          let formData = {
            useremail: distributor_id,
            point: points,
          };
          /*              sql = "INSERT INTO  stokez_point_history SET ?";
              const userss = await conn.query(sql, formData);*/
          statusCode = 200;
          message = "Points updated";
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
      /*           else {
            let formData = {
              stokez_id: stokez_id,
              point: points,
            };
            sql = "INSERT INTO  stokez_point SET ?";
            const userss = await conn.query(sql, formData);
            if (userss) {
              statusCode = 200;
              message = "Points updated";
            } else {
              statusCode = 500;
              message = "Something went wrong! database error";
            }
          }
  */
    } else {
      message = "Invalid stokez id";
      statusCode = 404;
    }

    const responseData1 = {
      status: statusCode,
      message,
    };
    res.send(responseData1);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database error");
  }
};

//transfer player point
const sendPointstoPlayer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { id, points } = req.body;

    let formData = {
      id: id,
      point: points,
    };
    let formData1 = {
      to: id,
      from: "Company",
      point: points,
    };

    if (points) {
      sql = `SELECT * FROM users WHERE email = ? limit ?`;
      responseData = await conn.query(sql, [id, 1]);
      if (responseData.length > 0) {
        console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].id;
        const tpoints = parseInt(points) + parseInt(responseData[0].point);

        sql = "UPDATE users SET ? WHERE email=?";
        updateResponse = await conn.query(sql, [{ point: tpoints }, id]);
        if (updateResponse) {
          //statusCode = 200
          // message    = "Points updated"
          sql = "INSERT INTO  point_history SET ?";
          const userss = await conn.query(sql, formData1);
          if (userss) {
            statusCode = 200;
            message = "Points updated";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
    } else {
      statusCode = 404;
      message = "Points required";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
/* //GamesHistory------------------
const getDoubleChanceHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    let data;
    try { 
           // let sql = `SELECT * FROM round_report WHERE game=1 and outer_win=NULL and inner_win=NULL `;
           let sql = `SELECT * FROM round_report WHERE game=1 `;

            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "NOT found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getJeetoJokerHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=2 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const get16CardsHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=3`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getSpinGameHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=4 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}

 */

const withdrawRequest = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    let sql = "INSERT INTO withdraw_requests SET ?";
    let formData1 = {
      email: req.body.email,
      amount: req.body.amount,
      //payment_methode_id: req.body.paymentid,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "withdraw updated";
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    //res.send("imageload sucessfully");
    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getwithdrawRequest = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  withdraw_requests`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const 
UPI = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    let sql = "INSERT INTO upi SET ?";
    let formData1 = {
      actual_name: req.body.actual_name,
      upi_address: req.body.upi_address,
      emailId: req.body.emailId,
      // payment_methode_id: req.body.paymentid,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "UPI updated";
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    //res.send("imageload sucessfully");
    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getUPI = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  upi`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const DailyBonus = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { playerid, bonus_day } = req.body;
    let sql = "INSERT INTO bonus SET ?";
    let formData1 = {
      playerid: req.body.playerid,
      bonus_day: req.body.bonus_day,
      // balance: req.body.balance,
      // payment_methode_id: req.body.paymentid,
    };
    // const bonusRows = JSON.parse(JSON.stringify(user))[0];

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "Daily Bonus updated";
      //  console.log("data", data);
      if (userss) {
        sql = `SELECT * FROM users WHERE useremail= ? limit ?`;
        responseData = await conn.query(sql, [playerid, 1]);
        if (responseData.length > 0) {
          const bonusadded = 1 + parseInt(responseData[0].point);
          sql = "UPDATE users SET point= ? WHERE useremail=?";

          const userss = await conn.query(sql, [bonusadded, playerid]);
          console.log(userss);
      

      //balance:balance;
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    //res.send("imageload sucessfully");
    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } }else{}
} 
  catch (error) {
    console.log(error)
    res.status(500).send("Database error");
  }
};

const Bank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    let sql = "INSERT INTO bank SET ?";
    console.log(req.body);
    let formData1 = {
      actual_name: req.body.actual_name,
      ifsc_code: req.body.ifsc_code,
      account_number: req.body.account_number,
      upi_address: req.body.upi_address,
      emailId: req.body.emailId,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "Bank detail updated";
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const fetchUPIBank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { emailId } = req.body;
  try {
    let sql = `SELECT * FROM  bank ,upi where  bank.emailId=upi.emailId`;
    const agent = await conn.query(sql, emailId);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";

      var data1 = {};
      // data1.status = 200;
      // data1.message = "success";
      var UPI = {};
      UPI.id = agent[0].id;
      UPI.actual_name = agent[0].actual_name;
      UPI.upi_address = agent[0].upi_address;
      data1.UPI = UPI;
      var account = {};

      account.ifsc_code = agent[0].ifsc_code;
      account.account_number = agent[0].account_number;
      account.actual_name = agent[0].actual_name;
      data1.account = account;
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getBank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  bank`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getfetchBank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { emailId } = req.body;
  try {
    let sql = `SELECT * FROM  bank where emailId=?`;
    const agent = await conn.query(sql, emailId);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";

      var data1 = {};
      // data1.status = 200;
      // data1.message = "success";
      /*  var UPI = {};
      UPI.id = agent[0].id;
      UPI.actual_name = agent[0].actual_name;
      UPI.upi_address = agent[0].upi_address;
      data1.UPI = UPI;
      */ var account = {};

      account.ifsc_code = agent[0].ifsc_code;
      account.account_number = agent[0].account_number;
      account.actual_name = agent[0].actual_name;
      data1.account = account;
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const referCode = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { useremail, refer_code } = req.body;
  try {
    /* let sql = `SELECT * FROM  users where useremail=?`;
    const agent = await conn.query(sql, useremail);
     */ if (refer_code != undefined) {
      sql = `SELECT * FROM users WHERE refer_code= ? limit ?`;
      var responseData = await conn.query(sql, [refer_code, 1]);
      if (responseData.length > 0) {
        sql = `SELECT * FROM users WHERE refer_code= ? limit ?`;
        responseData = await conn.query(sql, [refer_code, 1]);
        if (responseData.length > 0) {
          const bonusadded = 1 + parseInt(responseData[0].point);
          sql = "UPDATE users SET point= ? WHERE refer_code=?";

          const userss = await conn.query(sql, [bonusadded, refer_code]);
          console.log(userss);

            sql = `SELECT * FROM users WHERE useremail= ? limit ?`;
            responseData = await conn.query(sql, [useremail, 1]);
            if (responseData.length > 0) {
              const bonusadded = 1 + parseInt(responseData[0].point);
              sql = "UPDATE users SET point= ? WHERE useremail=?";

              const userss = await conn.query(sql, [bonusadded, useremail]);
              console.log(userss);
                statusCode = 200;
                message = " refer code successfully applied";

                data = { Balance: bonusadded };
              }
          
        } else {
        }
      }
    }

    const responseData1 = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData1);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Database error");
  }
};

module.exports = {
  /* createDistrubutor ,
    createStokez,
    createAgent,
    createPlayer,
    createUser,  
    getUsers,
    getAdminData,
    sendPoints,
    changePassword,
    resetPassword,
    getAgents,
    getAgentsData, */
  getPlayerData,
  getPlayerIdData,
  getPlayerHistoryData,
  LuckyDicegetPlayerHistoryData,

  //getAllPlayerData,
  WheelOfFortunegetPlayerHistoryData,
  PokergetPlayerHistoryData,
  TigerVsElephantgetPlayerHistoryData,
  LuckyBallgetPlayerHistoryData,
  Transaction,
  PointTransfer,
  PointReceive,
  PointCancel,
  PointRejected,
  GameReport,
  DailyStatus,
  getPlayerPointHistory,
  sendPoints,
  sendPointstoPlayer,

  withdrawRequest,
  getwithdrawRequest,
  UPI,
  getUPI,
  Bank,
  fetchUPIBank,
  getBank,
  getfetchBank,
  DailyBonus,
  referCode,
  /* getStokezPointHistory,
    getAgentPointHistory,
    getPlayerPointHistory,
    getDoubleChanceHistory,
    getJeetoJokerHistory,
    get16CardsHistory,
    getSpinGameHistory,
 */
};
