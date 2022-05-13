const express = require("express"),
  {
    getAllUsers,
    getSpecificUser,
    createNewUser,
    updateUser,
    Login,
    deleteUser,
  } = require("../controllers/user.controller"),
  router = express(),
  authenticate = require("../middlewares/auth.middleware"),
  {
    validateUser,
    validateUserUpdate,
    validateLogin,
  } = require("../models/user.model");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [USER MANAGEMENT MODULE]
 *     description: Get a list of all registered users
 *     summary: List of all users
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags: [USER MANAGEMENT MODULE]
 *     description: Get a specific user by his/her id
 *     summary: Single User Retrieval
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Header
 *         type: string
 *         in: header
 *         required: true
 *       - name: userId
 *         description: The specific user's id
 *         type: string
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", authenticate, getSpecificUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [USER MANAGEMENT MODULE]
 *     description: User Login Into their existing account.
 *     summary: User Login
 *     parameters:
 *       - name: email
 *         description: User's email
 *         type: string
 *         in: formData
 *         required: true
 *       - name: password
 *         description: User's password
 *         type: string
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

router.post("/login", validateLogin, Login);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [USER MANAGEMENT MODULE]
 *     description: Create a new user
 *     summary: New user creation
 *     parameters:
 *       - name: name
 *         description: Name of the new user
 *         type: string
 *         in: formData
 *         required: true
 *       - name: email
 *         description: Email of the new user
 *         type: string
 *         in: formData
 *         required: true
 *       - name: address
 *         description: Address of the new user (Format - Country, State/Province, District/City)
 *         type: string
 *         in: formData
 *         required: true
 *       - name: age
 *         description: Age of the new user
 *         type: number
 *         in: formData
 *         required: false
 *       - name: password
 *         description: Password of the new user
 *         type: string
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/", validateUser, createNewUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   patch:
 *     tags: [USER MANAGEMENT MODULE]
 *     description: Update a specific user by his/her id
 *     summary: Perform User update
 *     parameters:
 *       - name: id
 *         description: The specific user's id
 *         type: string
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: Authorization Header
 *         type: string
 *         in: header
 *         required: true
 *       - name: name
 *         description: Name of the new user
 *         type: string
 *         in: formData
 *         required: true
 *       - name: email
 *         description: Email of the new user
 *         type: string
 *         in: formData
 *         required: true
 *       - name: address
 *         description: Address of the new user (Format - Country, State/Province, District/City)
 *         type: string
 *         in: formData
 *         required: true
 *       - name: age
 *         description: Age of the new user
 *         type: number
 *         in: formData
 *         required: false
 *       - name: password
 *         description: Password of the new user
 *         type: string
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id", validateUserUpdate, updateUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags: [USER MANAGEMENT MODULE]
 *     description: Delete a specific user by his/her id
 *     summary: User Deletion
 *     parameters:
 *       - name: id
 *         description: The specific user's id
 *         type: string
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: Authorization Header
 *         type: string
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
