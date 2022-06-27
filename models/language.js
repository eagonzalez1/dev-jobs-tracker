import mongoose from 'mongoose'

const Schema = mongoose.Schema

const languageSchema = new Schema({
  name: String,
  proficient: Boolean,
}, {
  timestamps: true
})

const Language = mongoose.model('Language', languageSchema)

export {
  Language
}

