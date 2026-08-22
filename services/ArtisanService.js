import { db } from "../utils/db.js";

// Read Functionality

export async function getAllArtisans() {
    const { rows } = await db.query(`
        SELECT id, user_id, display_name, bio, craft_speciality, location, district, state, years_of_experience, profile_image, verification_status
        FROM artisans 
        ORDER BY id ASC
    `);

    return rows;
}