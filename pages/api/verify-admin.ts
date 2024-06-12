// pages/api/verify-admin.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { superbase } from "../../lib/supabaseClient";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse,
) {
 if (req.method === 'POST') {
  const { pwd } = req.body;
  console.log('Password:', pwd);

  try {
    const {data, error} = await superbase
    .from('admin')
    .select('*')
    .eq('password', pwd)
    
    if (error || !data) {
        console.error('An error occurred:', error);
        res.status(404).json({messsage: 'User not found'});
    } else {
        console.log('Admin data', data);
        res.status(200).json({ isValid: true });
    }

  } catch (error) {
   console.error('An error occurred:', error);
   res.status(500).json({ message: 'Internal server error' });
  }
 } else {
  res.status(405).json({ message: 'Method Not Allowed' });
 }
}
