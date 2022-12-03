import nextSession from "next-session";
import {v4 as uuidv4} from 'uuid';
import {promisifyStore} from "next-session/lib/compat";
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
	// No idea why the environment variables are not being used by the mongo container
	//uri: "mongodb://" + process.env.MONGO_INITDB_ROOT_USERNAME + ":" + process.env.MONGO_INITDB_ROOT_PASSWORD + "@mongo:27017/?authSource=admin",
	uri: process.env.MONGO_CONNECT_URL,
	collection: 'sessions'
});

store.on('error', (e)=>{
console.log(e);
});


export const getSession = nextSession({autoCommit: false, cookie:{maxAge: 28800}, store: promisifyStore(store)});
export async function getHeaderProps(session)
{
	var message = session.message;
	session.message = "";
	await session.commit();
	return {
		userInfo: session.userInfo ? session.userInfo : null,
		message: message ? message : "",
	  };
}