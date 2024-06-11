//path: /api/deleteUser.ts
import { superbase } from "../../lib/supabaseClient";

export default async function handler(req,res) {
    const {employee_id} = req.body;
    
    if (!employee_id) {
        res.status(400).json({message: 'Employee ID is required'});
    }
    console.log(employee_id);
    const {data, error} = await superbase
    .from('voters')
    .delete()
    .eq('employee_id', employee_id)
    .single()

    if (error || !data) {
        res.status(404).json({messsage: 'Employee not found'});
    } else {
        res.status(200).json({message: 'Employee deleted successfully'});
    }
}