import {getSession} from "../../lib/get-session.js";

export default async function(req, res) 
{
	var session = await getSession(req, res);
	await session.destroy();
	await session.commit();
	session = await getSession(req, res);
	session.message = "Successfully signed out."
	await session.commit();
	res.redirect(302, process.env.BASE_URL);
	
}
