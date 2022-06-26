import { Router } from 'express'
import * as jobPostCtrl from '../controllers/jobPosts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/jobPosts
router.get('/', isLoggedIn, jobPostCtrl.index)

// localhost:3000/jobPosts/new
router.get('/new', isLoggedIn, jobPostCtrl.new)

// POST localhost:3000/jobPosts
router.post('/', isLoggedIn, jobPostCtrl.create)

export {
  router
}