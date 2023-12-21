import { collectionListMock } from '../mock/collection'

export const store = {
  get: () => {
    if (typeof window === 'undefined') {
      return collectionListMock
    }

    const data = localStorage.getItem('collection')

    if (!data) {
      localStorage.setItem('collection', JSON.stringify(collectionListMock))
      return collectionListMock
    }

    return JSON.parse(data)
  },

  set: (payload: any) => {
    const d = store.get()

    d.push(payload)

    localStorage.setItem('collection', JSON.stringify(d))
    return d
  },
}
