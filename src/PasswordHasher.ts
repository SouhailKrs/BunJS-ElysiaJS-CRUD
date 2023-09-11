/**
 * Hash a password using the built-in password hashing in Bun.js.
 *
 * @async
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A hashed password string.
 */
export const hashPassword = async (password: string) => {
    return await Bun.password.hash(password);
};
