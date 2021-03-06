import { setCookie, parseCookies } from 'nookies'
import { NextContext } from 'next'
import { Instance } from 'mobx-state-tree'
import { ThemeModel } from '~/models/theme'

class ThemeStateRepository {
  private static _instance: ThemeStateRepository
  private ctx: NextContext
  private key: string

  public static get instance() {
    return this._instance || (this._instance = new this())
  }

  private constructor() {
    this.key = 'solid_book_theme'
  }

  public setContext(ctx: NextContext) {
    this.ctx = ctx
  }

  public load(): Instance<typeof ThemeModel> | null {
    try {
      const saved = parseCookies(this.ctx)
      const cookie = saved[this.key]
      return JSON.parse(cookie)
    } catch (e) {
      return null
    }
  }

  public save(state: object) {
    setCookie(this.ctx, this.key, JSON.stringify(state), {
      maxAge: 12 * 30 * 24 * 60 * 60
    })
  }
}

export default ThemeStateRepository
