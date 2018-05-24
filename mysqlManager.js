"use strict";
var mysql = require("mysql");

module.exports = class database {
  constructor() {
    this.con = mysql.createConnection({
      connectionLimit: 100,
      host: 'localhost',
      user: 'root',
      password: 'chbi12345',
      database: 'PhotoVideoBook',
    });
  }

  checkConnection() {
    this.con.connect(function (err) {
      if (err) {
        console.log(JSON.stringify(err));
      }
    });
  }

  getAllExperts(res) {
    var send = res;
    this.con.query("SELECT * FROM experts", function (err, result, fields) {
      if (err) {
        console.log(JSON.stringify(err));
      }
      send.setHeader('Content-Type', 'application/json');
      send.end(JSON.stringify(result));
    });
  }

  getExpert(Id) {
    this.con.query("SELECT " + Id + " FROM experts", function (err, result, fields) {
      if (err) {
        console.log(JSON.stringify(err));
      }
      return result;
    });
  }

  addUser(json, res) {
    this.con.query("INSERT INTO users (first_name, last_name, email, password) VALUES ('" + json.name + "', '" + json.surname + "', '" + json.mail + "', SHA2('" + json.password + "',256))", function (err, result, fields) {
      if (err) {
        console.log("error ocurred", err);
        if(err.errno===1062){
          res.send({
            "code": 400,
            "failed": "duplicate mail"
          });
        }else{
          res.send({
            "code": 400,
            "failed": "error ocurred"
          });
        }

      } else {
        console.log('The solution is: ', result);
        res.send({
          "code": 201,
          "success": "user registered sucessfully"
        });
      }
    });
  }

  checkValidUser(json, res) {
    this.con.query("SELECT first_name FROM users WHERE email = '" + json.mail + "' and SHA2('" + json.password + "',256)", function (error, result, fields) {
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        console.log('The solution is: ', result);
        if (result.length > 0) {
          res.cookie('name',result.first_name ,{expire : new Date() + 10000});
          res.send({
            "code": 200,
            "success": "login sucessfull"
          });
        }
      }
    });
  }
}
//id,brand,address,description,phone,mobille,link
//CREATE TABLE `users` (`uid` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`email` varchar(100) COLLATE utf8_unicode_ci NOT NULL UNIQUE,`password` varchar(510) COLLATE utf8_unicode_ci NOT NULL,PRIMARY KEY (`uid`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
//create table experts(id INT(6) PRIMARY KEY,brand VARCHAR(30) NOT NULL,address VARCHAR(150) NOT NULL,description VARCHAR(250),phone VARCHAR(10),mobile VARCHAR(10),link VARCHAR(50));
//LOAD DATA LOCAL INFILE '/media/scripter/Storage/PhotoVideoBook/data.csv'  INTO TABLE experts CHARACTER SET UTF8 COLUMNS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;