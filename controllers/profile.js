import { JobPost } from '../models/jobPost.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.findById(req.user.profile._id)
  .populate([
    {
      path: 'jobPosts',
      populate: {
        path: 'reqLanguages',
      },
    },
    {
      path: 'languages',
    },
  ])
  .then(profile => {
    console.log("PROFILE!!", profile)
    console.log("PROFILE JOB POSTS!!!", profile.jobPosts)
    JobPost.find({_id: {$in: profile.jobPosts}})
    .then(jobPosts => {
      jobPosts.forEach(jobPost => {
        jobPost.populate('reqLanguages.name')

      });
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