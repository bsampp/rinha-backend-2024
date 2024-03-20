import { sql } from './postgres'

async function setup() {

    await sql/*sql*/`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        limit_in_cents INTEGER NOT NULL,
        balance INTEGER NOT NULL
        );`

        
    await sql/*sql*/`
    CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        amount INTEGER NOT NULL,
        type_transaction CHAR(1) NOT NULL,
        description_transaction VARCHAR(10) NOT NULL,
        created_at TIMESTAMP NOT NULL        
    );`


    await sql/*sql*/`
    CREATE TABLE IF NOT EXISTS statements(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        total_balance INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL,
        limit_in_cents INTEGER NOT NULL
    );`

    const result = await sql/*sql*/`
        SELECT COUNT(*) AS count FROM users;
    `;
    
    const rowCount = result[0].count;

    if (rowCount == 0) {
        await sql/*sql*/`
            INSERT INTO users (id, limit_in_cents, balance)
            VALUES (DEFAULT, 1000 * 100, 0),
            (DEFAULT, 800 * 100, 0),
            (DEFAULT, 10000 * 100, 0),
            (DEFAULT, 100000 * 100, 0),
            (DEFAULT, 5000 * 100, 0);
        `;
    }else{
        await sql/*sql*/`
            DELETE FROM users;
        `;
    }

    await sql.end();
}

setup();