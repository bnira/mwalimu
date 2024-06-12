import { superbase } from "../../lib/supabaseClient";

/**
 * Retrieves candidates from the database based on the specified position.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the candidates are fetched.
 */
export default async function handler(req, res) {

    const { data: candidatesData, error: candidatesError } = await superbase
      .from('candidates')
      .select('*');
    
    const { data: votersData, error: votersError } = await superbase
      .from('voters')
      .select('*');
    
    const data = { candidates: candidatesData, voters: votersData };

    const error = candidatesError || votersError;
    if(error) {
        res.status(500).json({message: 'Error fetching candidates'});
    } else {
        res.status(200).json(data);
    }
}