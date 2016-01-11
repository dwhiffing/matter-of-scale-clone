import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import utils from 'profiles/utils/ProfileUtils'

describe('ProfileUtils', () => {

  describe('getProfileValue', () => {
    it('returns the correct value', () => {
      const profile = Factory.create('profile', {extension: {tagline: 'test'}})
      const value = utils.getProfileValue('tagline', profile)
      expect(value).to.equal('test')
    })
    it('returns the correct value for base', () => {
      const profile = Factory.create('profile', {zip: 696969})
      const value = utils.getProfileValue('zip', profile)
      expect(value).to.equal(696969)
    })
  })

  describe('genderTerm', () => {
    it('returns the correct value for females', () => {
      const value = utils.genderTerm('female')
      expect(value).to.equal('Cubs')
    })
    it('return the correct value for males', () => {
      const value = utils.genderTerm('male')
      expect(value).to.equal('Cougars')
    })
  })

  describe('getHeight', () => {
    it('returns the correct value for females', () => {
      const value = utils.getHeight(80)
      expect(value).to.equal('6\' 8" (203cm)')
    })
  })

  describe('decorateProfile', () => {
    it('returns the correct value', () => {
      const year = new Date().getFullYear()
      const age = 25
      const preference = {
        birthdate: `${year-age}-01-01`,
        body_type: "Slim",
        education: "Some College",
        age: 22,
        ethnicity: "Native American",
        eye_colour: "Hazel",
        hair_colour: "Gray",
        height: 53,
        height_cm: 135,
        income: "Rather Not Say"
      }
      const profile = Factory.create('profile', {preference})
      const value = utils.decorateProfile(profile)
      expect(value.preference.age).to.equal(age)
      expect(value.preference.height_ft).to.equal(4)
      expect(value.preference.height_in).to.equal(5)
      expect(value.preference.zodiak).to.equal('Capricorn')
    })
  })

  describe('getZodiak', () => {
    it('returns null for invalid dates', () => {
      expect(utils.getZodiak(12)).to.equal(null)
      expect(utils.getZodiak('10-10-10')).to.equal(null)
      expect(utils.getZodiak('balls')).to.equal(null)
    })

    it('returns the correct signs for January', () => {
      expect(utils.getZodiak('1999-01-20')).to.equal('Capricorn')
      expect(utils.getZodiak('1999-01-21')).to.equal('Aquarius')
    })

    it('returns the correct signs for February', () => {
      expect(utils.getZodiak('1999-02-18')).to.equal('Aquarius')
      expect(utils.getZodiak('1999-02-19')).to.equal('Pisces')
    })

    it('returns the correct signs for March', () => {
      expect(utils.getZodiak('1999-03-20')).to.equal('Pisces')
      expect(utils.getZodiak('1999-03-21')).to.equal('Aries')
    })

    it('returns the correct signs for April', () => {
      expect(utils.getZodiak('1999-04-20')).to.equal('Aries')
      expect(utils.getZodiak('1999-04-21')).to.equal('Taurus')
    })

    it('returns the correct signs for May', () => {
      expect(utils.getZodiak('1999-05-21')).to.equal('Taurus')
      expect(utils.getZodiak('1999-05-22')).to.equal('Gemini')
    })

    it('returns the correct signs for June', () => {
      expect(utils.getZodiak('1999-06-21')).to.equal('Gemini')
      expect(utils.getZodiak('1999-06-22')).to.equal('Cancer')
    })

    it('returns the correct signs for July', () => {
      expect(utils.getZodiak('1999-07-22')).to.equal('Cancer')
      expect(utils.getZodiak('1999-07-23')).to.equal('Leo')
    })

    it('returns the correct signs for August', () => {
      expect(utils.getZodiak('1999-08-23')).to.equal('Leo')
      expect(utils.getZodiak('1999-08-24')).to.equal('Virgo')
    })

    it('returns the correct signs for September', () => {
      expect(utils.getZodiak('1999-09-23')).to.equal('Virgo')
      expect(utils.getZodiak('1999-09-24')).to.equal('Libra')
    })

    it('returns the correct signs for October', () => {
      expect(utils.getZodiak('1999-10-23')).to.equal('Libra')
      expect(utils.getZodiak('1999-10-24')).to.equal('Scorpio')
    })

    it('returns the correct signs for November', () => {
      expect(utils.getZodiak('1999-11-22')).to.equal('Scorpio')
      expect(utils.getZodiak('1999-11-23')).to.equal('Sagittarius')
    })

    it('returns the correct signs for December', () => {
      expect(utils.getZodiak('1999-12-22')).to.equal('Sagittarius')
      expect(utils.getZodiak('1999-12-23')).to.equal('Capricorn')
    })
  })

  describe('getAge', () => {
    it('returns the correct age', () => {
      let today = new Date()
      let [year, month, day] = today.toISOString().slice(0,10).split('-')
      expect(utils.getAge(`${year-24}-${month}-${day}`)).to.equal(24)
      expect(utils.getAge(`${year-19}-${month}-${day}`)).to.equal(19)
    })
  })

  describe('arrayFromRange', () => {
    it('returns the expected range', () => {
      const result = utils.arrayFromRange(0,100)
      expect(result.length).to.equal(100)
      expect(result[0]).to.equal(1)
      expect(result[result.length - 1]).to.equal(100)
    })
  })

})
