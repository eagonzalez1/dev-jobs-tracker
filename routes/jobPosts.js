import { Router } from 'express'
import * as jobPostsCtrl from '../controllers/jobPosts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/jobPosts
router.get('/', isLoggedIn, jobPostsCtrl.index)

// localhost:3000/jobPosts/new
router.get('/new', isLoggedIn, jobPostsCtrl.new)

// GET localhost:3000/jobPosts/:id/edit
router.get('/:id/edit', isLoggedIn, jobPostsCtrl.edit)

// POST localhost:3000/jobPosts
router.post('/', isLoggedIn, jobPostsCtrl.create)

// POST localhost:3000/jobPosts/:id/contacts
router.post('/:id/contacts', isLoggedIn, jobPostsCtrl.createContact)

// POST localhost:3000/jobPosts/:id/contacts
router.post('/:id/reqLanguages', isLoggedIn, jobPostsCtrl.addLanguage)

// DELETE -- localhost:3000/:id
router.delete('/:id', jobPostsCtrl.delete)

// PUT -- localhost:3000/jobPosts/:id
router.put('/:id', jobPostsCtrl.update)

// DELETE -- localhost:3000/:id
router.delete('/:id/contacts/:contactId', jobPostsCtrl.deleteContact)

// DELETE -- localhost:3000/:id
router.delete('/:id/reqLanguages/:languageId', jobPostsCtrl.deleteReqLanguage)

export {
  router
}