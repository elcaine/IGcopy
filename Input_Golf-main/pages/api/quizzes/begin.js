import {getSession} from "../../../lib/get-session.js";
import path from "path";
var MongoClient = require('mongodb').MongoClient;
var http = require('axios');
const fs = require('fs');
import {checkCsrf} from "../../../lib/csrf.js";

export default async function handler(req, res) 
{
    var session = await getSession(req, res);
    if (!(session.userInfo.gh_id && checkCsrf(req, session)))
    {
        return res.status(401).end();
    }
    var topic = req.query.topic;
	var fp = path.join(process.cwd(), "pages", "api", "QsAnswerArraysOUT.json");

	// Bring json data in
	var theQuestions = await JSON.parse(await fs.readFileSync(fp));
	var solvedArray = [];
	for (var i = 0; i < theQuestions.length; i++)
	{
		if (theQuestions[i].topic == parseInt(topic))
		{
			solvedArray.push({id:theQuestions[i].id, question:theQuestions[i].question, answers:theQuestions[i].answers, solved:false});
		}
	}
	
	var doc = {}
	try
	{
		var client = await MongoClient.connect(process.env.MONGO_CONNECT_URL);
		var collection = await client.db("db").collection("users");
		doc = await collection.updateOne({gh_id:session.userInfo.gh_id}, {$set:{gameInProgress:parseInt(topic), solvedArray:solvedArray, attempts:0}},{upsert:true});
		console.log(doc);

	}
	catch(e)
	{
		console.log(e)
	}
	
	res.json(solvedArray);
	res.status(200).end();

	
}

