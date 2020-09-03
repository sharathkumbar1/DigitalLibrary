import themeConfig from './themeConfig'

describe('themeConfig', () => {
  it('should be defined', () => {
    expect(themeConfig).toBeDefined()
  })

  it('should be an object', () => {
    expect(typeof themeConfig).toBe('object')
  })

  it('should have a palette', () => {
    expect(themeConfig.palette).toBeDefined()
  })

  it('should have a primary key', () => {
    expect(themeConfig.palette.primary).toBeDefined()
  })

  it('should have an accent key', () => {
    expect(themeConfig.palette.secondary).toBeDefined()
  })
})
