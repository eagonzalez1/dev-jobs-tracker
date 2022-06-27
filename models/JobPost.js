import mongoose from 'mongoose'

const Schema = mongoose.Schema

const contactsSchema = new mongoose.Schema({
  name: String,
  contacted: Boolean,
  replied: Boolean
}, {
  timestamps: true
})


const jobPostSchema = new Schema({
  companyName: String,
  role: String,
  sector: String,
  salaryRange: String,
  motivation: {type: Number, min: 1, max: 5, default: 3},
  link: String,
  notes: String,
  application: Boolean,
  applied: Date,
  appReply: Boolean,
  contacts: [contactsSchema],
  reqLanguagues: [{type: Schema.Types.ObjectId, ref: "Languages"}]
}, {
  timestamps: true
})

const JobPost = mongoose.model('JobPost', jobPostSchema)

export {
  JobPost
}