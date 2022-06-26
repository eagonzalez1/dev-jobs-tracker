import { Router } from 'express'
import * as jobPostCtrl from '../controllers/jobPosts.js'
// import { JobPost } from '../models/jobPost'

const router = Router()

// GET localhost:3000/jobPosts
router.get('/', jobPostCtrl.index)

// localhost:3000/jobPosts/new
router.get('/new', jobPostCtrl.new)

// POST localhost:3000/jobPosts
router.post('/', jobPostCtrl.create)

export {
  router
}