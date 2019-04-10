const BaseDao = require("./base.dao");
const UseraccountsModel = require("../models/userAccounts.model");

const userAccountsDao = new BaseDao(UseraccountsModel);


async function updateUserData(query, update) {
    const updatePayload = {
        $set: update
    }
    const user = await userAccountsDao.findOneAndUpdate(query, updatePayload);
    return user;
   
}

async function insertUser(data){
    const userData = await userAccountsDao.saveData(data);
    return userData;
}

async function findUser(query){
    const resp = await userAccountsDao.findOne(query);
    return resp;
}


module.exports = {
    updateUserData,
    insertUser,
    findUser
};