//path: /api/checkEmployee
import { superbase } from "@/lib/supabaseClient";

/**
 * Handler function to check if an employee exists in the voters table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */

export default async function handler(req,res) {
    const {employeeId} = req.body;

    const {data, error} = await superbase
    .from('voters')
    .select('*')
    .eq('employee_id', employeeId)
    .single()

    if (error || !data) {
        res.status(404).json({messsage: 'Employee not found'});
    } else {
        res.status(200).json({message: 'Employee found'});
    }
}