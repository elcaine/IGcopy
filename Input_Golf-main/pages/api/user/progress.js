import {getSession} from "../../../lib/get-session.js";
var MongoClient = require('mongodb').MongoClient;
var http = require('axios');

export default async function handler(req, res) 
{
	var session = await getSession(req, res);
	var doc = {}
	try
	{
		var client = await MongoClient.connect(process.env.MONGO_CONNECT_URL);
		var collection = await client.db("db").collection("users");
		doc = await collection.findOne({gh_id:session.userInfo.gh_id});
		console.log(doc);

	}
	catch(e)
	{
		console.log(e)
	}
	
	res.status(200).json(doc);

	
}

export async function getProgress(req, res)
{


	var session = await getSession(req, res);
	var doc = {}
	try
	{
		var client = await MongoClient.connect(process.env.MONGO_CONNECT_URL);
		var collection = await client.db("db").collection("users");
		doc = await collection.findOne({gh_id:session.userInfo.gh_id});
		console.log(doc);

	}
	catch(e)
	{
		console.log(e)
	}
	
	return doc;

}
