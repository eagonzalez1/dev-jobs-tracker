import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  jobPosts: [{type: Schema.Types.ObjectId, ref: 'JobPost'}],
  languages: [{type: Schema.Types.ObjectId, ref: "Language"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
