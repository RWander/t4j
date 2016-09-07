const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Response = require('./Response');

const Job = new Schema({
  // Краткое описание
  summary: {
    type: String,
    required: true,
    trim: true
  },
  // Когда опубликовал
  postedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  // Кто опубликовал
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  // Ключевые слова
  tags: [String],
  // Количество просмотров
  watched: {
    type: Number,
    default: 0,
    required: true
  },
  // Количество откликов
  responsed: {
    type: Number,
    default: 0,
    required: true
  },
  // Отклики
  responses: [Response]
});

/**
 * Creates a new Job instance.
 * @param  {Object} data
 * @return {Promise}
 */
Job.statics.create = function(data) {
  const self = this;

  return new Promise(function(resolve, reject) {
    const job = new self(data);
    job.save(function(err) {
      if (err) return reject(err);

      resolve(job);
    });
  });
};

/**
 * Gets all comments.
 *
 * @return {Promise}
 */
Job.statics.getAll = function() {
  return this.find().exec();
};

/**
 * Job - gets all comments
 *
 * @return {Promise}
 */
Job.statics.watch = function(jobId) {
  // TODO: increase job.watched.
  return this.findOne().exec();
};

mongoose.model('jobs', Job);
