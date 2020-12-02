const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      validate: [validator.isAlpha, 'Name should be alpa'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      max: 5,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price //this only points to current doc on New document creation
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

//Mongooose Middleware
//Pre and Post hooks ==>pre-> run before actual events
//Four types of middleware in mongoose => document,query,aggregate,model middleware

//!Document Middleware in Mongoose ==> a middleware that can act on the currently processed document
//?only runs before .save() and .create()

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

//?Post Hook==>Post hook does not have access of this keyword.It has access to finished Doc.
// tourSchema.post('save', function(doc,next){
//   console.log(doc); //finished documnent
// })

//?Query Middleware =>  allows us to run functions before or after a certain query is executed
tourSchema.pre('/^find/', function (next) {
  //!Here "this" keyword points to current query not to current documents
  this.find({ secretTour: { $ne: true } })
  next()
})

//?Aggrgation Middleware => allows us to add hooks before or after an aggregation happens
tourSchema.pre('aggregate', function (next) {
  //!Here "this" keyword point to current aggregation object
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
  next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
