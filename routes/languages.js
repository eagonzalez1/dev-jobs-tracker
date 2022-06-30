import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as languagesCtrl from '../controllers/languages.js'

const router = Router()

// localhost:3000/languages/new
router.get('/new', isLoggedIn, languagesCtrl.new)

// localhost:3000/languages/new
router.post('/', isLoggedIn, languagesCtrl.create)

// DELETE -- localhost:3000/languages/:id
router.delete('/:id', languagesCtrl.delete)

// PATCH localhost:3000/languages/:id/flip-proficient
router.patch('/:id/flip-proficient', isLoggedIn, languagesCtrl.flipProficient)

export {
  router
}