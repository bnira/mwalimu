//path: /api/deleteUser.ts
import { superbase } from "../../lib/supabaseClient";

export default async function handler(req,res) {
    const {employee_id} = req.body;
    
    if (!employee_id) {
        res.status(400).json({message: 'Employee ID is required'});
    }
    console.log(employee_id);
    const {error} = await superbase
    .from('voters')
    .delete()
    .eq('employee_id', employee_id)
    .single()

    if (!error) {
        console.log('Employee deleted successfully');
        res.status(200).json({message: 'Employee deleted successfully'});
    } else {
        console.log('Error: ', error);
        res.status(500).json({message: 'An error occurred while deleting employee'});
    }
}