#! /bin/usr/env node
import inquirer from "inquirer";
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful.Remaining balance:$${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    //Credit money 
    deposite(amount) {
        if (amount > 100) {
            amount -= 1; //$1fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposite of $${amount} successful.Remaining balance:$${this.balance}`);
    }
    //Check balance 
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//custumer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const account = [
    new BankAccount(1501, 500),
    new BankAccount(1502, 1000),
    new BankAccount(1503, 1500)
];
//Create customers
const customers = [
    new Customer("Shagufta", "Zakir", "Female", 29, 3152726480, account[0]),
    new Customer("Zain", "Shah", "Male", 25, 3342391972, account[1]),
    new Customer("Shahzen", "Rajpoot", "Male", 32, 3302391972, account[2])
];
//function to interact with bank account
async function service() {
    do {
        let accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        let custumer = customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber);
        if (custumer) {
            console.log(`Welcome,${custumer.firstName} ${custumer.lastName}!\n`);
            let ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balancee", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    let depositAccount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    custumer.account.deposite(depositAccount.amount);
                    break;
                //case 2
                case "Withdraw":
                    let withdrawAccount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    custumer.account.withdraw(withdrawAccount.amount);
                    break;
                //case 3
                case "Check Balancee":
                    custumer.account.checkBalance();
                    break;
                //case 4
                case "Exit":
                    console.log("Exiting bank programe...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number.Please try again.");
        }
    } while (true);
}
service();
