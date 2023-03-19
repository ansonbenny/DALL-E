import { MongoClient } from "mongodb";

let db = null

export const connect = async (done) => {
    let url = process.env.DB_URL

    let dbName = 'dall_e'

    try {
        let data = await MongoClient.connect(url)
        db = data.db(dbName)
        done()
    } catch (error) {
        done(error)
    }
}

export { db }