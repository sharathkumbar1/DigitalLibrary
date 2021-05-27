import apiConfig from './apiConfig'

describe('apiConfig', () => {
  it('should be defined', () => {
    expect(apiConfig).toBeDefined()
  })

  it('should be an object', () => {
    expect(typeof apiConfig).toBe('object')
  })
})
