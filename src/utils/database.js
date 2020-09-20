const config = require("../../config.json");
const mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 10,
    host: config.DB_SSH_HOST,
    user: config.DB_SSH_USERNAME,
    password: config.DB_SSH_PASSWORD,
    database: config.DB_DATABASE
});

module.exports = {
    getConnection: (callback) => {
        return con.getConnection(callback);
    },

    dbQuery(databaseQuery) {
        return new Promise(data => {
            con.getConnection((err, con) => {
                con.query(databaseQuery, function (error, result) {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                    try {
                        data(result);
                    } catch (error) {
                        data({});
                        throw error;
                    }
                })
            })
        });
    }
}