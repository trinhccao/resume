import { readdir, readFile, watch } from 'node:fs/promises'

interface LocaleInterface {
  filename: string,
  designator: string
  default: boolean
  content: Record<any, any>
}

interface FileInfo {
  filename: string
  designator: string
  default: boolean
  path: string
}

class LocaleModel {
  #locales: Map<string, LocaleInterface> = new Map()
  #rootDir = 'locales'
  #regex = /^(\w+)(-\w+)?(\.\w+)?\.json$/

  constructor() {
    this.#init()
    this.#watch()
  }

  /**
   * Validate files name, and construct file information
   */
  #constructFileInfo(filenames: string[]): FileInfo[] {
    const filesInfo = filenames.reduce((filesInfo: FileInfo[], filename) => {
      const match = filename.match(this.#regex)
      if (!match) {
        return filesInfo
      }
      const [_match, language, region, isDefault] = match
      return [
        ...filesInfo,
        {
          filename,
          path: `${this.#rootDir}/${filename}`,
          designator: language + (region || ''),
          default: !!isDefault
        }
      ]
    }, [])
    return filesInfo
  }

  async #init(): Promise<void> {
    this.#locales.clear()

    const filenames = await readdir(this.#rootDir)
    const filesInfo = this.#constructFileInfo(filenames)

    for await (const fileInfo of filesInfo) {
      const buffer = await readFile(fileInfo.path)
      const json = JSON.parse(buffer.toString())
      this.#locales.set(fileInfo.filename, {
        filename: fileInfo.filename,
        designator: fileInfo.designator,
        default: fileInfo.default,
        content: json,
      })
    }
  }

  async #watch(): Promise<void> {
    const watcher = watch(this.#rootDir)
    for await (const _event of watcher) {
      this.#init()
    }
  }

  /**
   * Get locale data based on passed designator.
   * If no designator match, then default local data is returned
   */
  getLocaleData(designator: string) {
    const locales = [...this.#locales].map((item) => item[1])
    const match = locales.find((item) => item.designator === designator)
    if (match) {
      return match.content
    }
    return locales.find((item) => item.default)?.content
  }
}

export default new LocaleModel()