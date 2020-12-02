const express = require('express')
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMontlyPlan,
} = require('../controllers/tourController')
const router = express.Router()

/*
?param middleware
 router.param('id', checkId)
*/

router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMontlyPlan)

router.route('/top-5-cheap').get(aliasTopTours, getTours)
router.route('/').get(getTours).post(createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
