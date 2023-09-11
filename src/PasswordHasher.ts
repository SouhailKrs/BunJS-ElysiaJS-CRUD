export const hashPassword = async (password: string) => {
    return await Bun.password.hash(password);
};
