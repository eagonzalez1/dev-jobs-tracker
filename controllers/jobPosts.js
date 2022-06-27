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
    res.redirect('/profiles')
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
    res.redirect('/profiles')
  })
}

function deleteJobPost (req, res) {
  JobPost.findById(req.params.id).then(post => {post.delete()})
  Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.jobPosts.remove({_id: req.params.id})
      profile.save()
      .then(()=> {
        res.redirect('/profiles')
      })
    })
    .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function edit(req, res) {
  JobPost.findById(req.params.id)
  .then(jobPost => {
    res.render("jobPosts/edit", {
      jobPost,
      title: "Edit Job Post"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  JobPost.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(jobPost => {
    res.redirect('/profiles')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createContact(req, res) {
  JobPost.findById(req.params.id)
  .then(jobPost => {
    jobPost.contacts.push(req.body)
    jobPost.save()
    .then(() => {
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}


export {
  index,
  create,
  newJobPost as new,
  deleteJobPost as delete,
  edit,
  update,
  createContact,
}



// JobPost.findById(req.params.id)
// .then(jobPost => {
  
// })


  // //delete id from the profile jobPost array
  // Profile.findById(req.user.profile._id)
  //   .then(profile => {
  //     console.log(req.params.id)
  //     profile.jobPosts.deleteOne({"_id" : ObjectId(req.params.id)})


  //     // const post = profile.jobPosts.filter(post => profile.jobPosts._id === req.params.id)
  //     // console.log(post)
  //   })