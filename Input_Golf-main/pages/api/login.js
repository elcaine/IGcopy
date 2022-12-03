import { getSession } from "../../lib/get-session.js";
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config() 



export default async function handler(req, res) 
{
	// state parameter is not needed, there is no downside to allowing login csrf for our application
	res.redirect(302, 'https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID + "&redirect_uri=" + process.env.BASE_URL + "/api/login_callback");

}
