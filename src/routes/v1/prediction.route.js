const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const predictionValidation = require('../../validations/prediction.validation');
const predictionController = require('../../controllers/prediction.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePredictions'), validate(predictionValidation.createPrediction), predictionController.createPrediction)
  .get(auth('getPredictions'), validate(predictionValidation.getPredictions), predictionController.getPredictions);

router
  .route('/:predictionId')
  .get(auth('getPredictions'), validate(predictionValidation.getPrediction), predictionController.getPrediction)
  .patch(auth('managePredictions'), validate(predictionValidation.updatePrediction), predictionController.updatePrediction)
  .delete(auth('managePredictions'), validate(predictionValidation.deletePrediction), predictionController.deletePrediction);

router
  .route('/user/:userId')
  .get(
    auth('getPredictions'),
    validate(predictionValidation.getPredictionByUserId),
    predictionController.getPredictionByUserId
  );

router
  .route('/recommendations/portfolio')
  .get(
    auth('getPredictions'),
    validate(predictionValidation.getPredictionRecommendationsGeneral),
    predictionController.getPredictionRecommendationsGeneral
  );

router
  .route('/recommendations/user')
  .post(
    auth('getPredictions'),
    validate(predictionValidation.getPredictionRecommendationsForUser),
    predictionController.getPredictionRecommendationsByUserID
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Predictions
 *   description: Prediction management and retrieval
 */

/**
 * @swagger
 * path:
 *  /predictions:
 *    post:
 *      summary: Create a prediction
 *      description: Only admins can create other predictions.
 *      tags: [Predictions]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *                - role
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *                role:
 *                   type: string
 *                   enum: [prediction, admin]
 *              example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *                role: prediction
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Prediction'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all predictions
 *      description: Only admins can retrieve all predictions.
 *      tags: [Predictions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Prediction name
 *        - in: query
 *          name: role
 *          schema:
 *            type: string
 *          description: Prediction role
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of predictions
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Prediction'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /predictions/{id}:
 *    get:
 *      summary: Get a prediction
 *      description: Logged in predictions can fetch only their own prediction information. Only admins can fetch other predictions.
 *      tags: [Predictions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Prediction id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Prediction'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a prediction
 *      description: Logged in predictions can only update their own information. Only admins can update other predictions.
 *      tags: [Predictions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Prediction id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                name: fake name
 *                email: fake@example.com
 *                password: password1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Prediction'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a prediction
 *      description: Logged in predictions can delete only themselves. Only admins can delete other predictions.
 *      tags: [Predictions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Prediction id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
