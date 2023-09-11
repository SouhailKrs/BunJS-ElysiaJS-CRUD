import { Database } from 'bun:sqlite';

import { User } from './UserInterface';

 export class UsersDB {
    private db: Database;

    constructor() {
        this.db = new Database('users.db');
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }


    async getUsers() {
        return this.db.query('SELECT * FROM users').all();
    }


    async addUser(user: User) {

        return this.db.query(`INSERT INTO users (username, password) VALUES (?, ?) RETURNING *`).get(user.username, user.password) as User;
    }


    async updateUser(username: string, user: User) {
        return this.db.run(`UPDATE users SET username = '${user.username}', password = '${user.password}' WHERE username = '${username}'`)
    }


    async deleteUser(username: string) {
        return this.db.run(`DELETE FROM users WHERE username = '${username}'`)
    }

    async deleteAllUsers() {
        return this.db.run(`DELETE FROM users`)
    }
    async getUser(username: string, password: string) {
        return this.db.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`).get() as User;
    }

    async getUserByUsername(username: string) {
        return this.db.query(`SELECT * FROM users WHERE username = '${username}'`).get() as User;
    }
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)');
    }
    
}