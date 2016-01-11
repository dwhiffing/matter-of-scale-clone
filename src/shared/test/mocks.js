import Factory from 'js-factories'
import {initialState as searchInitialState} from 'search/reducers/searchReducers'
import {initialState as filterInitialState} from 'search/reducers/filterReducers'

if (!Factory.factories['profile']) {
  Factory.define('simpleProfile', function(profile) {
    const gender = this.is('female') ? 'female' : 'male'
    const login = gender == 'male' ? 'man' : 'lady'
    return Object.assign({}, {
      id: this.sequence('id'),
      login: this.sequence(i => `${login}${i}`),
    }, profile)
  })

  Factory.define('profile', function(profile) {
    const gender = this.is('female') ? 'female' : 'male'
    const login = gender == 'male' ? 'man' : 'lady'

    return Object.assign({}, {
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
        age: 22,
        ethnicity: "Native American",
        eye_colour: "Hazel",
        hair_colour: "Gray",
        height: 53,
        height_cm: 135,
        income: "Rather Not Say"
      },
      gift_sets: []
    }, profile)
  })

  Factory.define('photo', function(photo) {
    const isPrivate = this.is('private')
    const location = "000/000/010/10"
    const id = this.sequence('id')
    return Object.assign({}, {
      id: id,
      caption: this.sequence(i => `photo-${i}`),
      position: this.sequence('position'),
      private: isPrivate,
      moderation: "a",
      mini: '/photos/${location}/mini_${id}.jpg',
      small: '/photos/${location}/small_${id}.jpg',
      medium: '/photos/${location}/medium_${id}.jpg',
      large: '/photos/${location}/large_${id}.jpg'
    }, photo)
  })

  Factory.define('searchResult', function(result) {
    const advert = this.is('advert') == 1
    const priority = this.is('priority') == 1
    const login = this.is('female') ? 'lady' : 'man'
    return Object.assign({}, {
      advert: advert,
      priority: priority,
      login: this.sequence(i => `${login}${i}`),
      age: this.sample(20,24,28,32,36,40,44,48),
      location: 'City, State',
      large_photo_url: '/photos/000/000/010/10/large_0.jpg',
      private_photo_count: this.sample(0,1,2,3),
      public_photo_count: this.sample(0,1,2,3)
    }, result)
  })

  Factory.define('dashResult', function(result) {
    const advert = this.is('advert') == 1
    const priority = this.is('priority') == 1
    const login = this.is('female') ? 'lady' : 'man'
    return Object.assign({}, {
      login: this.sequence(i => `${login}${i}`),
      medium_photo_url: '/photos/000/000/010/10/large_0.jpg'
    }, result)
  })

  Factory.define('searchSettings', function(settings) {
    return Object.assign({}, searchInitialState, settings)
  })

  Factory.define('filterSettings', function(settings) {
    return Object.assign({}, filterInitialState, settings)
  })

  Factory.define('message', function(settings) {
    let gift = {}
    if (settings.giftId) {
      gift = Object.assign({}, {
        attachable_class: 'Gift',
        attachable_id: settings.giftId,
        type: 'GiftMessage'
      }, gift)
    }

    return Object.assign({}, {
      body: settings.body
    }, gift)
  })

  Factory.define('activity', function(result) {
    const login = this.is('female') ? 'lady' : 'man'
    return Object.assign({}, {
      login: this.sequence(i => `${login}${i}`),
      type: 'something',
      time: '99-99-9999'
    }, result)
  })

  Factory.define('package', function(result) {
    let type = this.is('credit') ? 'credit' : 'subscription'
    type = this.is('recurring') ? 'autorenewsub' : type
    return Object.assign({}, {
      type: type
    }, result)
  })

}

export default Factory
