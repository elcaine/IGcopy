import {getSession} from "../../../lib/get-session.js";
var http = require('axios');

export default async function handler(req, res) 
{
	var session = await getSession(req, res);
	
	res.status(200).json(session);
}
