import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'
import { bannerMapper, gamesMapper, highlightMapper } from '.'

describe('bannerMapper()', () => {
  it('should return an empty banner array if there are no games', () => {
    expect(bannerMapper([])).toStrictEqual([])
  })
  it('should return the right format when banner mapped', () => {
    const banner = {
      image: {
        url: '/image.jpg'
      },
      title: 'Banner title',
      subtitle: 'Banner subtitle',
      button: {
        label: 'Banner button',
        link: 'Button link'
      },
      ribbon: {
        text: 'Ribbon text',
        color: 'primary',
        size: 'small'
      }
    } as QueryHome_banners

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: 'http://10.201.84.10:1337/image.jpg',
        title: 'Banner title',
        subtitle: 'Banner subtitle',
        buttonLabel: 'Banner button',
        buttonLink: 'Button link',
        ribbon: 'Ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the right format when game mapped', () => {
    const game = {
      id: '1',
      name: 'Game name',
      slug: 'game_slug',
      cover: {
        url: '/game_url'
      },
      developers: [{ name: 'Developer 1' }],
      price: 350.0
    } as QueryGames_games

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'Game name',
        slug: 'game_slug',
        developer: game.developers[0].name,
        img: 'http://10.201.84.10:1337/game_url',
        price: 350.0
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return an empty highlight if this is null', () => {
    expect(highlightMapper(null)).toStrictEqual({})
  })

  it('should return the right format when highlight mapped', () => {
    const highlight = {
      title: 'HighLight title',
      subtitle: 'HighLight subtitle',
      background: {
        url: '/Highlight url'
      },
      floatImage: {
        url: '/FloatImage url'
      },
      buttonLabel: 'Button Label',
      buttonLink: 'Button Link',
      alignment: 'left'
    } as QueryHome_sections_freeGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'HighLight title',
      subtitle: 'HighLight subtitle',
      backgroundImage: 'http://10.201.84.10:1337/Highlight url',
      floatImage: 'http://10.201.84.10:1337/FloatImage url',
      buttonLabel: 'Button Label',
      buttonLink: 'Button Link',
      alignment: 'left'
    })
  })
})
