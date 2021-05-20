const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const predictionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
predictionSchema.plugin(toJSON);
predictionSchema.plugin(paginate);

/**
 * @typedef Prediction
 */
const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
