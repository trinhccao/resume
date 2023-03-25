import { Liquid } from 'liquidjs'
import vi from '../locales/vi.json'
import en from '../locales/en.json'

class Engine {
  #liquid: Liquid

  constructor() {
    this.#liquid = new Liquid({ extname: '.liquid', root: 'templates' })
  }

  async render(page: string, lang: string): Promise<string> {
    const data = lang === 'en' ? en : vi
    const content = await this.#liquid.renderFile('pages/' + page, { data })
    return await this.#liquid.renderFile('layout/theme', {
      data,
      page_content: content
    })
  }
}

const engine = new Engine()

export default engine