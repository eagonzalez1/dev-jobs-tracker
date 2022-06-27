import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as languagesCtrl from '../controllers/languages.js'

const router = Router()

// localhost:3000/languages/new
router.get('/new', isLoggedIn, languagesCtrl.new)


export {
  router
}