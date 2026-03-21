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

function findUserByEmail(email) {
    return staff.findOne({email: email})
}