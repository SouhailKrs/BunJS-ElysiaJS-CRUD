import { Elysia } from "elysia";
import { UsersDB } from "./UserCrud";
import { UserImpl } from "./UserInterface";
import { hashPassword } from "./PasswordHasher";

// Create a new instance of the Elysia app
const app = new Elysia();

// Create an instance of UsersDB to interact with user data
const usersDB = new UsersDB();

/**
 * Handle the root ("/") route and return a greeting message.
 *
 * @returns {String} A greeting message.
 */
app.get("/", () => "Hello from Souhail Krissaane 🔥");

/**
 * Handle GET request to retrieve a list of users.
 *
 * This function sends a GET request to the "/users" endpoint and retrieves a list of users
 * from the usersDB. If no users are found, it returns a message indicating that no users were found.
 *
 * @async
 * @returns {Promise<Array|String>} An array of user objects if users are found,
 *                                  or a string "No users found" if no users are found.
 */
app.get("/users", async () => {
  const users = await usersDB.getUsers();
  if (users.length === 0) {
    return "No users found";
  }
  return users;
});

/**
 * Handle GET request to fetch a user by their username.
 *
 * @param {Object} request - The request object containing parameters.
 * @param {String} request.params.username - The username to search for.
 * @returns {Promise<Object|String>} The user object if found, or a string "User not found" if not found.
 */
app.get("/user/:username", async (request) => {
  const user = await usersDB.getUserByUsername(request.params.username);
  if (!user) {
    return "User not found";
  }
  return user;
});

/**
 * Handle DELETE request to delete all users.
 *
 * @param {Object} request - The request object.
 * @returns {Promise<String>} A message indicating that users were deleted.
 */
app.delete("/deleteAll", async () => {
  await usersDB.deleteAllUsers();
  return "Users deleted";
});

/**
 * Handle POST request to sign up a new user.
 *
 * @param {Object} request - The request object containing the user information in the body.
 * @param {Object} request.body - The user's data including username and password.
 * @returns {Promise<Object|String>} The newly created user object if successful, or error messages if validation fails.
 */
app.post("/signup", async ({ body }) => {
  if (!body.username || !body.password) {
    return "Username and password are required";
  }
  const userExists = await usersDB.getUserByUsername(body.username);
  if (userExists) {
    return "Username already taken";
  }
  const newUser = new UserImpl(body.username, await hashPassword(body.password));
  const user = await usersDB.addUser(newUser);
  return user;
});

/**
 * Handle POST request to log in a user.
 *
 * @param {Object} request - The request object containing the user's login information in the body.
 * @param {Object} request.body - The user's login data including username and password.
 * @returns {String} A log message indicating login status.
 */
app.post("/login", async ({ body }) => {
  if (!body.username || !body.password) {
    return "Username and password are required";
  }
  const user = await usersDB.getUserByUsername(body.username);
  if (user) {
    const isMatch = Bun.password.verify(body.password, user.password);
    if (isMatch) {
      console.log("Login successful");
    } else {
      console.log("Invalid credentials");
    }
  } else {
    console.log("Login failed");
  }
});

/**
 * Handle PUT request to update a user's information.
 *
 * @param {Object} request - The request object containing the user's updated information in the body.
 * @param {Object} request.params - The parameters including the username to update.
 * @param {String} request.params.username - The username of the user to update.
 * @param {Object} request.body - The user's updated data including username and password.
 * @returns {Promise<Object|String>} The updated user object if found, or a string "User not found" if not found.
 */
app.put("/update/:username", async ({ body, params }) => {
  if (!body.username || !body.password) {
    return "Username and password are required";
  }
  const user = await usersDB.getUserByUsername(params.username);
  if (user) {
    const newUser = new UserImpl(body.username, await hashPassword(body.password));
    const updatedUser = await usersDB.updateUser(params.username, newUser);
    return newUser;
  } else {
    return "User not found";
  }
});

/**
 * Handle DELETE request to delete a user by their username.
 *
 * @param {Object} request - The request object containing the username to delete.
 * @param {Object} request.params - The parameters including the username to delete.
 * @param {String} request.params.username - The username of the user to delete.
 * @returns {Promise<String>} A message indicating whether the user was deleted or not found.
 */
app.delete("/delete/:username", async ({ params }) => {
  const username = params.username;
  const user = await usersDB.getUserByUsername(username);
  if (user) {
    await usersDB.deleteUser(username);
    return "User deleted";
  } else {
    return "User not found";
  }
});

app.listen(3000);
