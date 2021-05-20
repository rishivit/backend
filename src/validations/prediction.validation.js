const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createPrediction = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    type: Joi.string().required(),
  }),
};

const getPredictionRecommendationsGeneral = {
  body: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const getPredictionRecommendationsForUser = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const getPredictions = {
  query: Joi.object().keys({
    filename: Joi.string(),
    userId: Joi.string().custom(objectId),
  }),
};

const getPrediction = {
  params: Joi.object().keys({
    predictionId: Joi.string().custom(objectId),
  }),
};

const getPredictionByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updatePrediction = {
  params: Joi.object().keys({
    predictionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      filename: Joi.string().required(),
      userId: Joi.string().required().custom(objectId),
    })
    .min(1),
};

const deletePrediction = {
  params: Joi.object().keys({
    predictionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPrediction,
  getPredictions,
  getPrediction,
  getPredictionByUserId,
  getPredictionRecommendationsGeneral,
  getPredictionRecommendationsForUser,
  updatePrediction,
  deletePrediction,
};
