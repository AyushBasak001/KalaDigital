import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import { db } from '../utils/db.js';

export const renderAuthPage = async (req, res) => {
    try {

        return res.render("auth.ejs");

    } catch (err) {
        console.error("GET /auth error:", err.message);
        return res.status(500).send("Internal server error");
    }
}


export const login = async (req, res) => {
    const { username, password, role } = req.body;

    const result = await db.query(
        `SELECT id, username, password_hash, role, is_active
            FROM users
            WHERE username = $1 AND role = $2`,
        [username, role]
    );

    if (!result.rows.length) {
        return res.render("auth.ejs", {error: "Invalid credentials" });
    }

    const user = result.rows[0];

    if (!user.is_active) {
        return res.render("auth.ejs", {error: "Account disabled" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        return res.render("auth.ejs", {error: "Invalid credentials" });
    }

    const token = signToken({
        id: user.id,
        username: user.username,
        role: user.role
    });

    res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000 // 1 hour
    });

    if(role === 'ARTISAN') return res.redirect("/"); 
    else if(role === 'CUSTOMER') return res.redirect("/");
    else if(role === 'ADMIN') return res.redirect("/");
}

export const signup = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hash = await bcrypt.hash(password, 12);

        await db.query(
          `INSERT INTO users (username, password_hash, role)
          VALUES ($1, $2, $3)`,
          [username, hash, role]
        );

        res.redirect("/auth/");

    } catch (err) {
        console.error("POST /auth/signup error:", err.message);
        return res.status(500).send("Failed to create new account");
    }
}

export const logout = async (req, res) => {
    res.clearCookie("auth_token");
    res.redirect("/");
}


//Helper Functions

async function signupQuery(res, username, role, hash){
    // Using a transaction for atomicity
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const userRes = await client.query(
            `INSERT INTO users (username, password_hash, role)
            VALUES ($1, $2, $3)`,
            [username, hash, role]
        );

        await client.query('COMMIT');
        
        res.redirect("/auth/");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Signup Error:", error);
        res.status(500).send("Registration failed.");
    } finally {
        client.release();
    }
}
