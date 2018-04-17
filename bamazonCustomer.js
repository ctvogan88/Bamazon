// require NPM mods and other JS files
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
//var anal = require("./analysis.js");

var exit = false;

// here's the console log fxn idea I 'borrowed' from Hamed
var clog = function (message) {
    console.log(message);
}

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "bamazonDB"
});



// this is where the recursive loop runs until the user selects exit
function recApp() {

    // DB cnxn check
    /*  connection.connect(function(err) {
         if (!err) {
             console.log("Database is connected ... nn");
         } else {
             console.log("Error connecting database ... nn", err);
         }
     }); */
    if (!exit) {
        // displays the items for sale when the application is executed and immediately after a user decision
        dispItems();


        inquirer.prompt({
            name: "itemToBuy",
            type: "rawlist",
            message: "Please select an item to buy:",
            choices: [
                "cerveza",
                "tacos",
                "chiquitas",
                "perrito",
                "gato"
            ],
            validate: function notEmptyCheck(name){
                return name !== '';
            }
        }).then(function (resp1) {
                // here we ask how many
                inquirer.prompt({
                    name: "qty",
                    type: "input",
                    message: "How many would you like to buy?",
                    default: "1",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return false;
                      }
                }).then(function(resp2) {
                    checkStock(resp1.itemToBuy, resp2.qty);
                    clog(resp1.itemToBuy + " and " + resp2.qty); //= AVOCADOS AND 3

                });
            });
                //detUserSel(resp.itemToBuy);
        clog('inquirer goes here');
    }
}

function dispItems() {
    connection.query("SELECT * FROM products", function (err, resp) {
        if (err) throw err;
        console.table(resp);

        connection.end();
    });

    //recApp();
}

function checkStock(item, qty) {
    connection.query("SELECT * FROM products WHERE itemID = '3'" + item,)
}

function getItemsInArray() {

}

// sends the script back to the for sale items display and user options
recApp();

