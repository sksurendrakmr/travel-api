const Tour = require('../models/tourModel')
const APIFeatures = require('./../utils/apiFeatures')
/*
?Param Middleware
exports.checkId = (req, res, next, val) => {
  const id = req.params.id * 1
  const tour = tours.find((tour) => tour.id === id)
  if (!tour)
    return res.status(404).json({ status: 'Fail', message: 'Invalid ID' })

  next()
}
*/

exports.aliasTopTours = (req, res, next) => {
  //limit=5&sort=-averageRating,price
  req.query.limit = '5'
  req.query.sort = '-ratingAverage,price'
  req.query.fields = 'name price, ratingAverage,summary,difficulty'
  next()
}

exports.getTours = async (req, res) => {
  try {
    /*
    const tours = await Tour.find({duration:5,difficulty:'easy'})
    const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
    */

    //!EXECUTE THE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const tours = await features.query
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    })
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: err.message })
  }
}

exports.createTour = async (req, res) => {
  /*
  ?Other way to save data into mongoDB database
    const newTour = new Tour({data...})
    newTour.save()  //here we are saving the data on the instance of Tour model
   */

  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    //Tour.findOne({_id:req.params.id})

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: 'success', data: null })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    })
  }
}
