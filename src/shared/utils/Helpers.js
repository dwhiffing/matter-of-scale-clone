export const arrayFromRange = (length) => {
  return Array.apply(null, Array(length)).map((x,i) => i)
}

export const pageinateArray = (arr, page) => {
  let pages = Math.ceil(arr.length / page)
  return arrayFromRange(pages).map((t, i) => arr.slice(page * i, page*i + page))
}
