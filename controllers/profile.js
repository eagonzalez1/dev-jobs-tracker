import { JobPost } from '../models/jobPost.js'
import { Profile } from '../models/profile.js'


function index(req, res) {
  Profile.findById(req.user.profile._id)
  .populate('jobPosts')
  .then(profile => {
    JobPost.find({_id: {$in: profile.jobPosts}})
    .then(jobPosts => {
      res.render('profiles/index', {  
        profile,
        jobPosts,
        title: "Job Posts",
        user: req.user ? req.user : null
      })
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