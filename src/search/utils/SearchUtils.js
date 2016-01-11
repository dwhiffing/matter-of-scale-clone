// a mapping of Foster filter keys to junto api keys
const junto = {
  ages: 'age',
  eye_colour: 'eye_colour',
  hair_colour: 'hair_colour',
  body_type: 'body_type',
  ethnicity: 'ethnicity',
  language: 'search_locale',
  publicPhotos: 'has_photos',
  privatePhotos: 'has_private_photos',
  sortBy: 'order',
  location: 'search_location',
  distance: 'distance',
  heights: 'height',
  onlineStatus: 'online',
  newMember: 'new_member',
  keywords: 'terms'
}

export const mapJuntoResults = (r) => {
  return Object.assign(r, {
    location: r.display_location,
    public_photo_count: r.public_photos_count,
    private_photo_count: r.private_photos_count
  })
}

const arrayFilters = ['body_type', 'eye_colour', 'hair_colour', 'ethnicity', 'language']
const rangeFilters = ['ages', 'heights', 'distance']

export default {
  getParams(filters, results) {
    let params = ['per_page=10', `page=${results.page}`]

    Object.keys(filters).forEach((filter) => {
      if (!junto[filter] || filters[filter] == null) return

      // convert boolean value to array to simplify building filterString
      let value = filters[filter].constructor === Array ? filters[filter] : [filters[filter]]

      value.forEach((val, idx) => {
        let range = arrayFilters.indexOf(filter) > -1 ? '[]' : ''
        if (rangeFilters.indexOf(filter) > -1) {
          range = idx == 0 && junto[filter] != 'distance' ? '[min]' : '[max]'
        }
        params.push(`${junto[filter]}${range}=${val}`)
      })
    })

    if (results.showPriority) {
      params.push('priority_listings=true')
    }

    return encodeURI(`?${params.join('&')}`)
  }
}
