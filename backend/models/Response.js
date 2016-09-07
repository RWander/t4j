const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Response - sub schema of Job
 * @type {Schema}
 */
const Response = new Schema({
  text: {
    type: String,
    required: true
  },
  // Кто откликнулся
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'doers',
    required: true
  },
  // Когда откликнулся
  postedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  // Обсуждение задачи между откликнувшимся исполнителем и заказчиком
  discussion: [{
    text: {
      type: String,
      required: true
    },
    postedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    // Если true - ответ от исполнителяня, инчае от заказчика
    isDoer: {
      type: Boolean,
      default: false,
      required: true
    }
  }]
});

module.exports = Response;
