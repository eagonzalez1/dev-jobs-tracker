import { Language } from '../models/language.js'
import { JobPost } from '../models/jobPost.js'
import { Profile } from '../models/profile.js'


// function index(req, res) {
//   JobPost.find({})
//   .then(jobPosts => {
//     res.render('jobPosts/index', {
//       jobPosts,
//       title: "Job Posts",
//       user: req.user ? req.user : null
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect("/")
//   })
// }

function index(req, res) {
  Profile.findById(req.user.profile._id)
  .populate('languages')
  .then(profile => {
    Language.find({_id: {$in: profile.languages}})
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

function newLanguage(req, res) {
  Language.find({})
  .then(languages => {
    res.render("languages/new", {
      title: "Manage Languages",
      languages
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function create(req, res) {
  console.log(req.body)
	req.body.proficient = !!req.body.proficient
  Language.create(req.body)
  .then(language => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.languages.push(language._id)
      profile.save()
    })
    res.redirect('/languages/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}



function flipProficient(req, res) {
  Language.findById(req.params.id)
  .then(language => {
    language.proficient = !language.proficient
    language.save()
    .then(() => {
      res.redirect('/languages/new')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}




// function deleteJobPost (req, res) {
//   JobPost.findById(req.params.id).then(post => {post.delete()})
//   Profile.findById(req.user.profile._id)
//     .then(profile => {
//       profile.jobPosts.remove({_id: req.params.id})
//       profile.save()
//       .then(()=> {
//         res.redirect('/profiles')
//       })
//     })
//     .catch(err => {
//     console.log(err)
//     res.redirect('/profiles')
//   })
// }

// function edit(req, res) {
//   JobPost.findById(req.params.id)
//   .then(jobPost => {
//     res.render("jobPosts/edit", {
//       jobPost,
//       title: "Edit Job Post"
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect("/")
//   })
// }

// function update(req, res) {
//   for (let key in req.body) {
//     if(req.body[key] === "") delete req.body[key]
//   }
//   JobPost.findByIdAndUpdate(req.params.id, req.body, {new: true})
//   .then(jobPost => {
//     res.redirect('/profiles')
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect("/")
//   })
// }




export {
  newLanguage as new,
  create,
  flipProficient
  // index,
  // deleteJobPost as delete,
  // edit,
  // update,

}

