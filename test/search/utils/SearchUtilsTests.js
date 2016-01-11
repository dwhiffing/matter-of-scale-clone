import Factory from 'shared/test/mocks'
import {expect} from 'chai'
import SearchUtils from 'search/utils/SearchUtils'

describe('SearchUtils', () => {
  describe('getParams', () => {
    let results = Factory.create('searchSettings')
    let filters = Factory.create('filterSettings', {
      body_type: ['strong'],
      eye_colour: ['brown', 'blue', 'green'],
      hair_colour: ['brown'],
      ethnicity: ['asian', 'white'],
      language: ['english'],
      ages: [18, 24],
      heights: [18, 24],
      distance: [200],
      publicPhotos: false,
      privatePhotos: true,
      location: 'someplace'
    })

    let params = decodeURI(SearchUtils.getParams(filters, results))

    it('should return the currentState filters correctly serialized for array filters', () => {
      expect(params).to.include('body_type[]=strong')
      expect(params).to.include('eye_colour[]=brown&eye_colour[]=blue&eye_colour[]=green')
      expect(params).to.include('hair_colour[]=brown')
      expect(params).to.include('ethnicity[]=asian&ethnicity[]=white')
      expect(params).to.include('search_locale[]=english')
    })

    it('should return the currentState filters correctly serialized for range filters', () => {
      expect(params).to.include('age[min]=18')
      expect(params).to.include('age[max]=24')
      expect(params).to.include('height[min]=18')
      expect(params).to.include('height[max]=24')
      expect(params).to.include('distance[max]=200')
    })

    it('should return the currentState filters correctly serialized for boolean filters', () => {
      expect(params).to.include('has_photos=false')
      expect(params).to.include('has_private_photos=true')
    })

    it('should return the currentState filters correctly serialized for string filters', () => {
      expect(params).to.include('search_location=someplace')
    })

    it('should return the currentState page correctly', () => {
      let results = Factory.create('searchSettings', {page: 4})
      let params = decodeURI(SearchUtils.getParams(filters, results))
      expect(params).to.include('page=4')
    })

    it('should set priority_listings true if showPriority is true', () => {
      let results = Factory.create('searchSettings', {showPriority: true})
      let params = decodeURI(SearchUtils.getParams(filters, results))
      expect(params).to.include('priority_listings=true')
    })

  })
})
