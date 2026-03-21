const {MongoClient} = require("mongodb")
const config = require("./dbConfig.json")

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const client = new MongoClient(url)
const db = client.db('gym')
const staff = db.collection('staff')
const accounts = db.collection('accounts')

(async function connection() {
    try {
        await db.command({ping: 1})
        console.log("Connected to database")
    } catch (ex) {
        console.log(`Could not connect to ${url} because ${ex.message}`)
        process.exit(1)
    }
})();

export function findStaffByEmail(email) {
    return staff.findOne({email: email})
}

export async function createStaff(staffUser) {
    await staff.insertOne(staffUser)
}

export async function addStaffAuth(staffUser) {
    await staff.updateOne({email: staffUser.email}, {$set: {authToken: staffUser.authToken}})
}

export async function removeStaffAuth(staffUser) {
    await staff.updateOne({email: staffUser.email}, {$set: {authToken: -1}})
}

export function findStaffByAuthToken(authToken) {
    return staff.findOne({authToken: authToken})
}

export async function createNewAccount(user) {
    await accounts.insertOne(user)
}

export function getAccounts() {
    return accounts.find({}).toArray()
}

export function getAccount(uuid) {
    return accounts.findOne({uuid: uuid})
}

export async function reserveAccount(email, uuid) {
    const account = await accounts.findOne({uuid: uuid})

    if (!account) {
        return "ANF"
    }

    if (account.checkedOut.length > 1 && account.checkedOut[1] !== email) {
        return account.checkedOut[1]
    } else if (account.checkedOut.length === 1) {
        const checkAccount = await collection.updateOne({uuid: uuid}, {$push: {checkedOut: email}})
        return checkAccount.checkedOut[1]
    } else {
        return account.checkedOut[1]
    }
}

export async function checkInAccount(email, uuid) {
    const account = await accounts.findOne({uuid: uuid})

    if (!account) {
        return "ANF"
    }

    if(account.checkedOut.length > 1 && account.checkedOut[1] === email) {
        await accounts.updateOne({uuid: uuid}, {$set: {checkedOut: ["No"]}})
        return email
    } else if (account.checkedOut > 1) {
        return account.checkedOut[1]
    } else {
        return "No"
    }
}

export async function saveAccount(email, uuid, updatedAccount) {
    const account = await accounts.findOne({uuid: uuid})

    if (!account) {
        return "ANF"
    }

    if (account.checkedOut.length > 1 && account.checkedOut[1] === email) {
        await accounts.replaceOne({uuid: uuid}, updatedAccount)
    } else if (account.checkedOut > 1) {
        return account.checkedOut[1]
    } else {
        return "No"
    }
}
