import {checkCsrf} from "../../../lib/csrf.js";
import {getSession} from "../../../lib/get-session.js";
import path from "path";
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
import { getProgress } from "../user/progress.js";
import {getAllResourcesFromDirectory } from "../resources";

export default async function(req, res)
{

    // TODO: implement logic for solving a question for a topic
    var session = await getSession(req, res);
    var progress = await getProgress(req, res);
    if (!(session.userInfo.gh_id && checkCsrf(req, session)))
    {
        return res.status(401).end();
    }
    var qId = parseInt(req.query.qId);
    var submittedAnswerIndex = parseInt(req.query.answerIndex);
	var fp = path.join(process.cwd(), "pages", "api", "QsAnswerArraysOUT.json");

	// Check if the answer is correct
	var theQuestions = await JSON.parse(await fs.readFileSync(fp));
    var solved = false;
	for (var i = 0; i < theQuestions.length; i++)
	{
		if (theQuestions[i].id === qId && theQuestions[i].correctAnswerIndex === submittedAnswerIndex)
		{
			solved = true;
		}
	}
	if (solved == false)
    {
        res.json({solved:false});
        res.status(200).end();
    }
	var doc = {}
	try
	{
		var client = await MongoClient.connect(process.env.MONGO_CONNECT_URL);
		var collection = await client.db("db").collection("users");
        doc = await collection.findOne({gh_id:session.userInfo.gh_id});
        var attempts = doc.attempts + 1;
        var solvedArray = doc.solvedArray;
        for (var i = 0; i < solvedArray.length; i++)
        {
            if (solvedArray[i].id === qId)
            {
                solvedArray[i].solved = true;
            }
        }

		doc = await collection.updateOne({gh_id:session.userInfo.gh_id}, {$set:{solvedArray:solvedArray, attempts: attempts}},{upsert:true});
        doc = await collection.findOne({gh_id:session.userInfo.gh_id});
        var allSolved = true;
        for (var i = 0; i < solvedArray.length; i++)
        {
            if (solvedArray[i].solved == false)
            {
                allSolved = false;
            }
        }
        
        var newRecord = false;
        var newRecordsDoc = [];
        if (doc.records && doc.records[progress.gameInProgress] > attempts)
        {
            newRecordsDoc = doc.records;
            newRecordsDoc[progress.gameInProgress] = attempts;
            newRecord = true;
            console.log("in top");
        }
        else if (!doc.records)
        {
            newRecord = true;
            newRecordsDoc = [];
            for (var i = 0; i < (await getAllResourcesFromDirectory()).length; i++)
            {
                newRecordsDoc.push(1337);
            }
            console.log("in bottom");
        }
        
        if (allSolved && newRecord == true)
        {
            doc = await collection.updateOne({gh_id:session.userInfo.gh_id}, {$set:{gameInProgress:null, solvedArray:[], attempts: 0, records: newRecordsDoc}},{upsert:true});
            session.message = "Finished with a score of " + attempts;
        }
        else if (allSolved)
        {
            doc = await collection.updateOne({gh_id:session.userInfo.gh_id}, {$set:{gameInProgress:null, solvedArray:[], attempts: 0}},{upsert:true});
            session.message = "Finished with a score of " + attempts + ". New personal record!";
        }

	}
	catch(e)
	{
		console.log(e)
	}
	await session.commit();
	res.json({solved:true});
	res.status(200).end();

}