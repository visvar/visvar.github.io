import { createReadStream } from 'node:fs'
import csv from 'fast-csv'
import { publicationSheet, memberConfig } from '../config.js'

const publications = []
const stream = createReadStream(publicationSheet)
csv
  .parseStream(stream, { headers: true })
  .on('data', data => data.Title !== '' && publications.push(data))
  .on('end', check)



async function check () {
  const links = [...getPubLinks(), ...getMemberLinks()]

  console.log(`checking ${links.length} links`)

  for (const [index, link] of links.entries()) {
    console.log(`${index + 1} / ${links.length}`)

    if (!isValidUrl) {
      console.warning('Invalid URL', link.label, link.url)
      return
    }
    try {
      const res = await fetch(link.url)
      // console.log(res)
      if (res.status.toString().startsWith('4')) {
        console.error(`\n${link.label}\n${link.url}\nbroken with status ${res.status} ${res.statusText}`)
        // console.log(res)

      }
    } catch (error) {
      console.error(`\n${link.label}\n${link.url}\nbroken with error`, error)
    }
  }
}


function getPubLinks () {
  const links = []
  for (const pub of publications) {
    Object.keys(pub).forEach((key) => {
      const value = pub[key].trim()
      if (value.startsWith('http')) {
        links.push({
          label: pub['Key (e.g. for file names)'],
          url: value
        })
      }
    })
  }
  return links
}

/**
 * TODO:
 */
function getMemberLinks () {
  const links = []
  for (const m of memberConfig) {
    for (const link of m.links) {
      links.push({
        label: `${m.name} > ${link.text}`,
        url: link.url
      })
    }
  }
  return links
}


/**
 * https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/
 * @param {*} string
 * @returns
 */
function isValidUrl (string) {
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}
