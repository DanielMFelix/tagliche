async function connect(){
    if (global.connection && global.connection.state !=='disconnected')
        return global.connection;
    
    const mysql2 = require("mysql2/promise");
    const connection1 = await mysql2.createConnection("mysql://root:arte3457@localhost:3306/nodelogin");
    console.log("Conectou no MySQL!");
    global.connection1 = connection1;
    return connection1;
}

connect();

//accounts//

async function selectAccounts(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM nodelogin.accounts')
    return rows;
}

async function insertAccounts(accounts){
    const conn =  await connect();
    const sql = 'INSERT INTO accounts(username, password, email) VALUES (?,?,?);';
    const values = [accounts.username, accounts.password, accounts.email];
    await conn.query(sql,values);
}

async function existe(){
    const conn = await connect();
    const sql = await conn.query("SELECT * FROM accounts WHERE username = 'daniel' AND password='daniel'");
    return sql;
}

async function searchAccount(username, password){
    const conn = await connect();
    const sql = "SELECT * FROM accounts WHERE username = ? AND password = ?;";
    const values = [username, password];
    const [rows] = await conn.query(sql,values);
    return rows;
}



async function selectExercises(user_name){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM nodelogin.'+user_name);
    return rows;
}

async function updateExercises(id, day, user_name, answer){
    const conn = await connect();
    const sql = 'UPDATE '+user_name+' SET '+day+'=? WHERE id=?';
    const value = [answer, id];
    return await conn.query(sql,value);
}

module.exports = {selectAccounts,insertAccounts,existe,searchAccount,selectExercises,updateExercises}


