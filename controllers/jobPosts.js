import { JobPost } from '../models/jobPost.js'


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
  console.log('test123')

	req.body.application = !!req.body.application
  req.body.appReply = !!req.body.appReply
  JobPost.create(req.body)
  .then(jobPost => {
    res.redirect('/jobPosts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/jobPosts')
  })
}


export {
  index,
  create,
  newJobPost as new,
}