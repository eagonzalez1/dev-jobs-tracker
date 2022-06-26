import { JobPost } from '../models/jobPost.js'
import { Profile } from '../models/profile.js'


function index(req, res) {
  JobPost.find({})
  .then(jobPosts => {
    res.render('jobPosts/index', {
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

function newJobPost(req, res) {

  res.render("jobPosts/new", {
    title: "Add Job Post",
  })
  .catch(err => {
    console.log(err)
    res.redirect('/jobPosts')
  })
}

function create(req, res) {
	req.body.application = !!req.body.application
  req.body.appReply = !!req.body.appReply
  JobPost.create(req.body)
  .then(jobPost => {
    console.log(`new id ${jobPost._id}`)
    Profile.findById(req.user.profile._id)
    .then(profile => {
      console.log(`new2 id ${jobPost._id}`)
      profile.jobPosts.push(jobPost._id)
      profile.save()
      console.log(profile)
    })
    res.redirect('/profiles')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/jobPosts')
  })
}

function deleteJobPost (req, res) {
  console.log('delete buttomg works')
}


export {
  index,
  create,
  newJobPost as new,
  deleteJobPost as delete,
}