// path: /api/addEmployees
import { superbase } from "../../lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const {employeeId, employeeName } = req.body;

    if (!employeeId || !employeeName) {
        res.status(400).json({message: 'Please provide employee id and name'});
    }

    const {error} = await superbase 
    .from('voters')
    .insert([{employee_id: employeeId, Name: employeeName}])

    if (error?.code === '23505') {
        console.log('Erorr: ', error);
        res.status(500).json({message: 'Employee already exists'});
    } else if (error) {
        console.log('Error: ', error);
        res.status(500).json({message: 'An error occurred while adding employee'});
    } else {
        res.status(200).json({message: 'Employee added successfully'});
    }
}