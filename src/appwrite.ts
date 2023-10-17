import { ID, Account, Client, Databases, Storage } from 'appwrite';

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const account = new Account(client)
const db = new Databases(client)
const storage = new Storage(client)

export {account, db, client, storage, ID}