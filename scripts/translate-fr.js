// scripts/translate-merge.js
import fs from 'fs'
import path from 'path'
import translate from 'google-translate-api-x'

// ✅ Helper: Flatten JSON
function flattenJson(obj, parentKey = '', res = {}) {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenJson(obj[key], newKey, res)
    } else {
      res[newKey] = obj[key]
    }
  }
  return res
}

// ✅ Helper: Unflatten JSON
function unflattenJson(obj) {
  const result = {}
  for (const key in obj) {
    const keys = key.split('.')
    keys.reduce((acc, part, i) => {
      if (i === keys.length - 1) {
        acc[part] = obj[key]
      } else {
        acc[part] = acc[part] || {}
      }
      return acc[part]
    }, result)
  }
  return result
}

// ✅ Helper: Safe Translate
async function translateString(text, targetLang) {
  // code / placeholders ko skip karna hai
  if (/^<.*>$/.test(text) || text.includes('__split__')) {
    return text
  }
  try {
    const res = await translate(text, { to: targetLang })
    return res.text
  } catch {
    return text
  }
}

// ✅ Batch translator
async function translateInChunks(keys, values, targetLang, existingFlat) {
  const translated = {}
  const BATCH_SIZE = 10 // ek baar me 10 lines, bada file ke liye safe
  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    const slice = keys.slice(i, i + BATCH_SIZE)
    await Promise.all(
      slice.map(async (key) => {
        if (existingFlat[key]) {
          translated[key] = existingFlat[key] // already translated
        } else {
          translated[key] = await translateString(values[key], targetLang)
        }
      })
    )
    console.log(`Progress: ${Math.min(((i + BATCH_SIZE) / keys.length) * 100, 100).toFixed(2)}%`)
  }
  return translated
}

async function main() {
  const targetLang = 'fr'
  const basePath = path.join(process.cwd(), 'locales')
  const enFile = path.join(basePath, 'en.json')
  const frFile = path.join(basePath, 'fr.json')

  const enData = JSON.parse(fs.readFileSync(enFile, 'utf-8'))
  const frData = fs.existsSync(frFile) ? JSON.parse(fs.readFileSync(frFile, 'utf-8')) : {}

  const flatEn = flattenJson(enData)
  const flatAr = flattenJson(frData)

  const keys = Object.keys(flatEn)
  const translated = await translateInChunks(keys, flatEn, targetLang, flatAr)

  const merged = unflattenJson({ ...flatEn, ...translated })

  fs.writeFileSync(frFile, JSON.stringify(merged, null, 2), 'utf-8')
  console.log(`✅ Translation complete. Updated file: ${frFile}`)
}

main().catch((err) => console.error('❌ Error:', err))
