// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const response = await axios.post('http://localhost:8000/users/login', new URLSearchParams({
                username: email,
                password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            res.status(200).json(response.data);
        } catch (error:any) {
            res.status(error.response.status).json(error.response.data);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
