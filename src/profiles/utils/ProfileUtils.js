import store from 'shared/redux/store'

const zodiaks = [
  [120, 'Capricorn'],
  [218, 'Aquarius'],
  [320, 'Pisces'],
  [420, 'Aries'],
  [521, 'Taurus'],
  [621, 'Gemini'],
  [722, 'Cancer'],
  [823, 'Leo'],
  [923, 'Virgo'],
  [1023, 'Libra'],
  [1122, 'Scorpio'],
  [1222, 'Sagittarius'],
  [1231, 'Capricorn']
]

const yyyymmdd = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/

let ProfileUtils = {
  getProfileValue(attr, profile) {
    let model = this.attrToModel[attr]
    return model === 'profile' ? profile[attr] : profile[model][attr]
  },
  genderTerm(gender) {
    gender = gender /* istanbul ignore next */ || store.getState().currentProfile.gender
    return gender === 'female' ? 'Cubs' : 'Cougars'
  },
  getHeight(n) {
    return this.height_opts[n - 53][1]
  },
  decorateProfile(profile) {
    let p = Object.assign({}, profile)
    p.preference = Object.assign({}, profile.preference)
    p.preference.height_ft = Math.floor(p.preference.height/12)
    p.preference.height_in = p.preference.height%12
    p.preference.height_pretty = `${p.preference.height_ft}'${p.preference.height_in}" / ${p.preference.height_cm}cm`
    p.preference.age = this.getAge(p.preference.birthdate)
    p.preference.zodiak = this.getZodiak(p.preference.birthdate)
    return p
  },
  getZodiak(date) {
    if (typeof date !== 'string' || !yyyymmdd.test(date)) return null
    const number = parseInt(date.split('-')[1], 10) * 100 + parseInt(date.split('-')[2])
    return zodiaks.filter(z => {
      return number <= z[0]
    })[0][1]
  },
  getAge(date) {
    let diff = new Date() - new Date(date)
    return Math.floor(diff/31536000000)
  },
  arrayFromRange(start, end) {
    let output = []
    while (start < end) output.push(++start)
    return output
  },
  height_slider_opts: [53, 84, 1],
  age_ranges: {
    range: [18, 65],
    male: [18, 35],
    female: [35, 65]
  },
  attrToModel: {
    tagline: 'extension',
    about_me: 'extension',
    seeking: 'extension',
    occupation: 'extension',
    question_responses: 'extension',

    birthdate: 'preference',
    height: 'preference',
    ethnicity: 'preference',
    body_type: 'preference',
    hair_colour: 'preference',
    eye_colour: 'preference',
    income: 'preference',
    education: 'preference',

    country: 'profile',
    city: 'profile',
    state: 'profile',
    gender: 'profile',
    login: 'profile',
    zip: 'profile'
  },
  ethnicity_opts: [
    "Asian",
    "Black / African Descent",
    "Caucasian / White",
    "Hispanic",
    "East Indian",
    "Middle Eastern",
    "Mixed Race",
    "Native American",
    "Pacific Islander",
    "Other",
    "Rather Not Say"
  ],
  male_body_type_opts:[
    "Slim",
    "Athletic",
    "Muscular",
    "Average",
    "A Few Extra Pounds",
    "Full Figured"
  ],
  female_body_type_opts: [
    "Slim",
    "Athletic",
    "Muscular",
    "Average",
    "A Few Extra Pounds",
    "Full Figured",
    'Curvy/Voluptuous'
  ],
  hair_colour_opts: [
    "Auburn",
    "Black",
    "Blonde",
    "Brown",
    "Red",
    "Gray",
    "White",
    "Bald",
    "Other"
  ],
  eye_colour_opts: [
    "Black",
    "Blue",
    "Brown",
    "Gray",
    "Green",
    "Hazel",
    "Multicolored",
    "Other"
  ],
  popular_country_opts: ['US', 'GB', 'CA', 'AU', 'IE', 'ES', 'ZA', 'DE', 'CH', 'AT', 'JP'],
  country_opts: [
    ['AS','American Samoa'],
    ['AD','Andorra'],
    ['AI','Anguilla'],
    ['AQ','Antarctica'],
    ['AG','Antigua and Barbuda'],
    ['AR','Argentina'],
    ['AW','Aruba'],
    ['AU','Australia'],
    ['AT','Austria'],
    ['BS','Bahamas'],
    ['BH','Bahrain'],
    ['BB','Barbados'],
    ['BE','Belgium'],
    ['BZ','Belize'],
    ['BJ','Benin'],
    ['BM','Bermuda'],
    ['BT','Bhutan'],
    ['BO','Bolivia'],
    ['BW','Botswana'],
    ['BV','Bouvet Island'],
    ['BR','Brazil'],
    ['IO','British Indian Ocean Territory'],
    ['BN','Brunei Darussalam'],
    ['BF','Burkina Faso'],
    ['CM','Cameroon'],
    ['CA','Canada'],
    ['CV','Cape Verde'],
    ['KY','Cayman Islands'],
    ['TD','Chad'],
    ['CL','Chile'],
    ['CN','China'],
    ['CX','Christmas Island'],
    ['CC','Cocos (Keeling) Islands'],
    ['CO','Colombia'],
    ['KM','Comoros'],
    ['CR','Costa Rica'],
    ['CI','Cote D\'Ivory'],
    ['HR','Croatia'],
    ['CY','Cyprus'],
    ['CZ','Czech Republic'],
    ['DK','Denmark'],
    ['DJ','Djibouti'],
    ['DM','Dominica'],
    ['DO','Dominican Republic'],
    ['EC','Ecuador'],
    ['SV','El Salvador'],
    ['GQ','Equatorial Guinea'],
    ['EE','Estonia'],
    ['FK','Falkland Islands (Malvinas)'],
    ['FO','Faroe Islands'],
    ['FJ','Fiji'],
    ['FI','Finland'],
    ['FR','France'],
    ['GF','French Guiana'],
    ['PF','French Polynesia'],
    ['TF','French Southern Territories'],
    ['GA','Gabon'],
    ['GM','Gambia'],
    ['DE','Germany'],
    ['GH','Ghana'],
    ['GI','Gibraltar'],
    ['GR','Greece'],
    ['GL','Greenland'],
    ['GD','Grenada'],
    ['GP','Guadeloupe'],
    ['GU','Guam'],
    ['GN','Guinea'],
    ['GW','Guinea-Bissau'],
    ['GY','Guyana'],
    ['HM','Heard Island and Mcdonald Islands'],
    ['VA','Holy See (Vatican City State)'],
    ['HN','Honduras'],
    ['HK','Hong Kong'],
    ['HU','Hungary'],
    ['IS','Iceland'],
    ['IN','India'],
    ['IE','Ireland'],
    ['IL','Israel'],
    ['IT','Italy'],
    ['JM','Jamaica'],
    ['JP','Japan'],
    ['JO','Jordan'],
    ['KE','Kenya'],
    ['KI','Kiribati'],
    ['KP','Korea, Democratic People\'s Republic of'],
    ['KR','Korea, Republic of'],
    ['KW','Kuwait'],
    ['LV','Latvia'],
    ['LB','Lebanon'],
    ['LS','Lesotho'],
    ['LI','Liechtenstein'],
    ['LT','Lithuania'],
    ['LU','Luxembourg'],
    ['MO','Macao'],
    ['MG','Madagascar'],
    ['MW','Malawi'],
    ['MV','Maldives'],
    ['ML','Mali'],
    ['MT','Malta'],
    ['MH','Marshall Islands'],
    ['MQ','Martinique'],
    ['MR','Mauritania'],
    ['MU','Mauritius'],
    ['YT','Mayotte'],
    ['MX','Mexico'],
    ['FM','Micronesia, Federated States of'],
    ['MC','Monaco'],
    ['MS','Montserrat'],
    ['MA','Morocco'],
    ['MZ','Mozambique'],
    ['NA','Namibia'],
    ['NP','Nepal'],
    ['NL','Netherlands'],
    ['AN','Netherlands Antilles'],
    ['NC','New Caledonia'],
    ['NZ','New Zealand'],
    ['NI','Nicaragua'],
    ['NE','Niger'],
    ['NU','Niue'],
    ['NF','Norfolk Island'],
    ['MP','Northern Mariana Islands'],
    ['NO','Norway'],
    ['OM','Oman'],
    ['PW','Palau'],
    ['PS','Palestinian Territory, Occupied'],
    ['PA','Panama'],
    ['PG','Papua New Guinea'],
    ['PY','Paraguay'],
    ['PE','Peru'],
    ['PN','Pitcairn'],
    ['PL','Poland'],
    ['PT','Portugal'],
    ['PR','Puerto Rico'],
    ['QA','Qatar'],
    ['RE','Reunion'],
    ['SH','Saint Helena'],
    ['KN','Saint Kitts and Nevis'],
    ['LC','Saint Lucia'],
    ['PM','Saint Pierre and Miquelon'],
    ['VC','Saint Vincent and the Grenadines'],
    ['WS','Samoa'],
    ['SM','San Marino'],
    ['ST','Sao Tome and Principe'],
    ['SA','Saudi Arabia'],
    ['SN','Senegal'],
    ['SC','Seychelles'],
    ['SG','Singapore'],
    ['SK','Slovakia'],
    ['SI','Slovenia'],
    ['SB','Solomon Islands'],
    ['SO','Somalia'],
    ['ZA','South Africa'],
    ['GS','South Georgia and the South Sandwich Islands'],
    ['ES','Spain'],
    ['LK','Sri Lanka'],
    ['SJ','Svalbard and Jan Mayen'],
    ['SZ','Swaziland'],
    ['SE','Sweden'],
    ['CH','Switzerland'],
    ['TW','Taiwan, Province of China'],
    ['TZ','Tanzania, United Republic of'],
    ['TH','Thailand'],
    ['TL','Timor-Leste'],
    ['TG','Togo'],
    ['TK','Tokelau'],
    ['TO','Tonga'],
    ['TT','Trinidad and Tobago'],
    ['TN','Tunisia'],
    ['TR','Turkey'],
    ['TC','Turks and Caicos Islands'],
    ['TV','Tuvalu'],
    ['UG','Uganda'],
    ['AE','United Arab Emirates'],
    ['GB','United Kingdom'],
    ['US','United States'],
    ['UM','United States Minor Outlying Islands'],
    ['UY','Uruguay'],
    ['VU','Vanuatu'],
    ['VN','Viet Nam'],
    ['VG','Virgin Islands, British'],
    ['VI','Virgin Islands, U.S.'],
    ['WF','Wallis and Futuna'],
    ['EH','Western Sahara'],
    ['ZM','Zambia']
  ],
  education_opts: [
    "High School",
    "Some College",
    "Associates Degree",
    "Bachelors Degree",
    "Graduate Degree",
    "PHD / Post Doctoral"
  ],
  language_opts: [
    "English",
    "Spanish",
    "German"
  ],
  search_sort_opts: {
    popularity: 'Popularity',
    last_active_at: 'Recently Online',
    created_at: 'Newest',
    age: 'Age',
    distance: 'Distance'
  }
}

ProfileUtils.height_opts = ProfileUtils.arrayFromRange(52, 84).map(i => {
  return [i, `${Math.floor(i/12)}' ${i%12}" (${Math.ceil(i*2.53)}cm)`]
})

export default ProfileUtils
