import chai from 'chai'
import Factory from 'js-factories'

global.chai = chai
global.expect = chai.expect
global.Factory = Factory

Factory.define('simpleProfile', function() {
  let gender = this.is('female') ? 'female' : 'male'
  let login = gender == 'male' ? 'man' : 'lady'
  return {
    id: this.sequence('id'),
    login: this.sequence(i => `${login}${i}`)
  }
})

Factory.define('profile', function(profile = {}) {
  let gender = this.is('female') ? 'female' : 'male'
  let login = gender == 'male' ? 'man' : 'lady'

  return Object.assign(profile, {
    id: this.sequence('id'),
    login: this.sequence(i => `${login}${i}`),
    city: "Toronto",
    gender: gender,
    state: "ON",
    country: "CA",
    zip: "L1W1L7",
    extension: {
      seeking: "I am looking for turtles.",
      about_me: "I like turtles.",
      tagline: "I love the way the sky looks at night.",
      occupation: "Teacher",
      profile_photo_url: "/photos/000/000/288/288/medium_zzzz.jpg?1430333034"
    },
    preference: {
      birthdate: "1992-01-01",
      body_type: "Slim",
      education: "Some College",
      ethnicity: "Native American",
      eye_colour: "Hazel",
      hair_colour: "Gray",
      height: 53,
      height_cm: 135,
      income: "Rather Not Say"
    },
    gift_sets: []
  })
})
