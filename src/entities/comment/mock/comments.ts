import { TComment } from '../model/types'

export const mockComments: TComment[] = [
  {
    id: '1',
    author: 'alex',
    avatar: 'https://i.pravatar.cc/100?img=1',
    text: 'Это лучший мем который я видел сегодня 😂',
    createdAt: '2 мин назад',
  },

  {
    id: '2',
    author: 'maria',
    avatar: 'https://i.pravatar.cc/100?img=2',
    text: 'Жиза просто на 100%',
    createdAt: '10 мин назад',
  },

  {
    id: '3',
    author: 'den',
    avatar: 'https://i.pravatar.cc/100?img=3',
    text: 'Сохранил себе 🤘',
    createdAt: '18 мин назад',
  },

  {
    id: '4',
    author: 'nightdev',
    avatar: 'https://i.pravatar.cc/100?img=4',
    text: 'TikTok UX already here',
    createdAt: '1 ч назад',
  },
]