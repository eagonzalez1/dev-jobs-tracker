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
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.jobPosts.push(jobPost._id)
      profile.save()
    })
    res.redirect('/profiles')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/jobPosts')
  })
}

function deleteJobPost (req, res) {
  //delete id from the profile jobPost array
  Profile.findById(req.user.profile._id)
    .then(profile => {
      console.log(req.params.id)
      profile.jobPosts.deleteOne({"_id" : ObjectId(req.params.id)})


      // const post = profile.jobPosts.filter(post => profile.jobPosts._id === req.params.id)
      // console.log(post)
    })
    res.redirect('/profiles')
  .catch(err => {
    console.log(err)
    res.redirect('/jobPosts')
  })
  console.log(req.params.id)
}


export {
  index,
  create,
  newJobPost as new,
  deleteJobPost as delete,
}