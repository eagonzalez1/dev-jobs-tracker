import { Language } from '../models/language.js'
import { Profile } from '../models/profile.js'

function newLanguage(req, res) {
  Profile.findById(req.user.profile._id)
  .populate('languages')
  .then(profile => {
    Language.find({_id: {$in: profile.languages}})
    .then(languages => {
      console.log(`SEE HERE ${profile.languages}`)
      res.render("languages/new", {
        title: "Manage Languages",
        languages
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function create(req, res) {
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

function deleteLanguage(req, res) {
  Language.findByIdAndDelete(req.params.id)
  .then(() => {
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

export {
  newLanguage as new,
  create,
  deleteLanguage as delete,
  flipProficient
}

