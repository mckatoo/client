import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'
import { QueryOrders_orders } from 'graphql/generated/QueryOrders'
import {
  bannerMapper,
  cartMapper,
  gamesMapper,
  highlightMapper,
  ordersMapper
} from '.'

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
        img: `${process.env.NEXT_PUBLIC_API_URL}/image.jpg`,
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
        img: `${process.env.NEXT_PUBLIC_API_URL}/game_url`,
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
      backgroundImage: `${process.env.NEXT_PUBLIC_API_URL}/Highlight url`,
      floatImage: `${process.env.NEXT_PUBLIC_API_URL}/FloatImage url`,
      buttonLabel: 'Button Label',
      buttonLink: 'Button Link',
      alignment: 'left'
    })
  })
})

describe('cartMapper()', () => {
  it('should return an empty cart if this is null', () => {
    expect(cartMapper(undefined)).toStrictEqual([])
  })

  it('should return the right format when cart mapped', () => {
    const game = {
      id: '1',
      cover: {
        url: '/image.jpg'
      },
      name: 'game',
      price: 10
    } as QueryGames_games

    expect(cartMapper([game])).toStrictEqual([
      {
        id: '1',
        img: `${process.env.NEXT_PUBLIC_API_URL}/image.jpg`,
        title: 'game',
        price: '$10.00'
      }
    ])
  })
})

describe('ordersMapper()', () => {
  it('should return an empty list if this is null', () => {
    expect(ordersMapper(undefined)).toStrictEqual([])
  })

  it('should return mapped items', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: 'visa',
        card_last4: '4242',
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 10
          }
        ]
      }
    ] as QueryOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: 'visa',
          img: '/img/cards/visa.png',
          number: '**** **** **** 4242',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: `${process.env.NEXT_PUBLIC_API_URL}/image.jpg`,
            price: '$10.00'
          }
        ]
      }
    ])
  })

  it('should return free game when its free', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: null,
        card_last4: null,
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 0
          }
        ]
      }
    ] as QueryOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: null,
          img: null,
          number: 'Free Game',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: `${process.env.NEXT_PUBLIC_API_URL}/image.jpg`,
            price: '$0.00'
          }
        ]
      }
    ])
  })
})
