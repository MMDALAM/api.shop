const router = require("express").Router();

const authController = require("../../http/controllers/user/auth/authController");

/**
 * @swagger
 * tags:
 *      name: User-Auth
 *      description: User-auth section
 */
/**
 * @swagger
 * /user/login:
 *    post:
 *      tags: [User-Auth]
 *      summary: login user in userpalan with phone number
 *      description: one time password(OTP) login
 *      parameters:
 *      -   name: mobile
 *          description: fa-IRI phonenumber
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          201:
 *            description: Success
 *          400:
 *            description: Bad request
 *          401:
 *            description: Unauthorization
 *          500:
 *            description: Internal server error
 */

router.post("/login", authController.login);

module.exports = {
  UserAuthRouters: router,
};
