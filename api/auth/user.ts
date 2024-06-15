// pages/api/auth/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ detail: 'Not authenticated' });
    }
    try {
        const response = await axios.get('http://localhost:8000/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json(response.data);
    } catch (error:any) {
        res.status(error.response.status).json(error.response.data);
    }
}
