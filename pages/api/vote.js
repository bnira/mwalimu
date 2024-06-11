import { superbase } from "../../lib/supabaseClient";

/**
 * Handles the voting process for the API endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the voting process is complete.
 */
export default async function handler(req, res) {
    const {presidentId, deputyPresidentId, employeeId} = req.body;

    // Fetch the voter data to check if the employee has already voted
    const {data: voterData, error: voterFetchError} = await superbase
    .from('voters')
    .select('voted')
    .eq('employee_id', employeeId);

    if (voterFetchError) {
        res.status(500).json({message: 'Error fetching voter'});
        return;
    }

    if (voterData[0].voted) {
        res.status(400).json({message: 'Employee has already voted'});
        return;
    }

    // Fetch the current votes for the president and deputy president candidates
    const {data: presidentData, error: presidentFetchError} = await superbase
    .from('candidates')
    .select('votes')
    .eq('id', presidentId);

    const {data: deputyData, error: deputyFetchError} = await superbase
    .from('candidates')
    .select('votes')
    .eq('id', deputyPresidentId);

    if (presidentFetchError || deputyFetchError) {
        console.error('Error fetching votes', presidentFetchError, deputyFetchError);
        res.status(500).json({message: 'Error fetching votes'});
        return;
    }

    // Update the votes for the president and deputy president candidates
    const {error: presidentUpdateError} = await superbase
    .from('candidates')
    .update({votes: presidentData[0].votes + 1})
    .eq('id', presidentId);

    const {error: deputyUpdateError} = await superbase
    .from('candidates')
    .update({votes: deputyData[0].votes + 1})
    .eq('id', deputyPresidentId);

    if (presidentUpdateError || deputyUpdateError) {
        console.error('Error submitting vote', presidentUpdateError, deputyUpdateError);
        res.status(500).json({message: 'Error submitting vote'});
        return;
    }

    // Update the voter data to mark the employee as having voted
    const {error: voterUpdateError} = await superbase
    .from('voters')
    .update({voted: true})
    .eq('employee_id', employeeId);

    if (voterUpdateError) {
        console.error('Error updating voter', voterUpdateError);
        res.status(500).json({message: 'Error updating voter'});
        return;
    }

    res.status(200).json({message: 'Vote submitted successfully'});
}