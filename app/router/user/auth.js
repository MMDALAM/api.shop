const router = require("express").Router();
const authController = require("app/http/controllers/user/auth/authController");

/**
 * @swagger
 * tags:
 *      name: User-Auth
 *      description: User-auth section
 */

/**
 * @swagger
 * /user/get-otp:
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
router.post("/get-otp", authController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Auth]
 *          summary: check-otp value in user controller
 *          description: check otp woth code mobile and expires date
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code recived
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                description: Success
 *              400:
 *                description: Bad request
 *              401:
 *                description: Unauthorization
 *              500:
 *                description: Internal server error
 */
router.post("/check-otp", authController.checkOtp);

module.exports = {
  UserAuthRouters: router,
};
