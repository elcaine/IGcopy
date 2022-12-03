var http = require('axios');
var MongoClient = require('mongodb').MongoClient;
import {v4 as uuidv4} from 'uuid';
import {getSession} from "../../lib/get-session.js";

export default async function(req, res) 
{
	// TODO: need to handle the case where the login fails
	var session = await getSession(req, res);
	var response = await http.post('https://github.com/login/oauth/access_token', {client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET, code: req.query.code, redirect_uri: process.env.BASE_URL + "/api/login_callback"});
	var userInfoResponse = await http.get('https://api.github.com/user',{headers:{Authorization: 'Bearer ' + (new URLSearchParams(response.data).get('access_token'))}});
	session.userInfo = {gh_id: userInfoResponse.data.id, username: userInfoResponse.data.login};
	session.message = "Successfully signed in.";
	session.csrfToken = uuidv4();
	try
	{
		var client = await MongoClient.connect(process.env.MONGO_CONNECT_URL);
		var collection = await client.db("db").collection("users");
		const filter = {gh_id:userInfoResponse.data.id};
		// update last login and add the necessary
		const update = {$set:{gh_id:userInfoResponse.data.id, lastLogin:Date.now()}};
		var dbres = await collection.updateOne(filter, update, {upsert:true});
		console.log(dbres);
		var doc = collection.findOne({gh_id:userInfoResponse.data.id})
		if (!doc.records)
        {
            newRecordsDoc = [];
            for (var i = 0; i < (await getAllResourcesFromDirectory()).length; i++)
            {
                newRecordsDoc.push(1337);
            }
			collection.updateOne({gh_id:userInfoResponse.data.id}, {$set:{records:newRecordsDoc}}, {upsert:true});
        }

	}
	catch(e)
	{
		console.log(e);
	}
	
	await session.commit();
	res.redirect(302, process.env.BASE_URL);
	
}
