import { readFile } from 'node:fs/promises'

async function getLocale(lang: string): Promise<Record<any, any>> {
  const buffer = await readFile(`locales/${lang}.json`)
  return JSON.parse(buffer.toString())
}

export default getLocale