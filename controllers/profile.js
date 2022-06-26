import { JobPost } from '../models/jobPost.js'
import { Profile } from '../models/profile.js'


function index(req, res) {
  console.log('test321')
  console.log(req.user.profile._id)
  Profile.findById(req.user.profile._id)

  .then(jobPosts => {
  res.render('profiles/index', {
      jobPosts,
      title: "Job Posts",
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}


export {
  index,
}