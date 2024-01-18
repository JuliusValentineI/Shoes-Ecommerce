import fs from 'fs'

export default function handler(req, res) {

	if (req.method === 'GET') {

		const data = fs.readFileSync('data/users.json', 'utf-8');
		const users = JSON.parse(data);
		res.status(200).json(users);

	} 
	else if (req.method === 'POST') {
		const { username, name, lastname, email, password } = req.body;

		if ( !name || !lastname || !email || !password ) 
			return res.status(400).json({error: 'All fields response'})
		
		const data = fs.readFileSync('data/users.json', 'utf-8');
		const users = JSON.parse(data);

		const newUser = {
			id : users.length + Math.floor(Math.random() * 8000000),
			username,
			name,
			lastname,
			email, 
			password
		}

		users.push(newUser);

		fs.writeFileSync('data/users.json', JSON.stringify(users), 'utf-8')
		res.status(201).json(newUser);

	} else res.status(405).json({ message: 'Not method'})
}
