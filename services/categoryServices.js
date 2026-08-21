import { db } from "../utils/db.js";

export async function getAllCategories() {
    const { rows } = await db.query(`
        SELECT id, name, icon
        FROM category
        ORDER BY id ASC
    `);

    return rows;
}

export async function getCategoryNameById(categoryId) {
    const { rows } = await db.query(`
        SELECT name
        FROM category
        WHERE id = $1
    `, [categoryId]);

    return rows[0] || null;
}