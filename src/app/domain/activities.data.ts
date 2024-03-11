import { Activity } from './activity.type'

/**
 * List of activities available for booking
 * @description Used while the backend is not implemented
 */
export const ACTIVITIES: Activity[] = [
  {
    name: 'Paddle surf',
    location: 'Lake Leman at Lausanne',
    price: 125,
    date: new Date(2023, 7, 15),
    minParticipants: 5,
    maxParticipants: 9,
    status: 'done',
    id: 1,
    slug: 'paddle-surf-lake-leman-at-lausanne',
    duration: 2,
    userId: 1
  },
  {
    name: 'Hiking',
    location: 'Mount Teide at Tenerife',
    price: 200,
    date: new Date(2025, 8, 11),
    minParticipants: 3,
    maxParticipants: 7,
    status: 'published',
    id: 2,
    slug: 'hiking-mount-teide-at-tenerife',
    duration: 4,
    userId: 2
  },
  {
    name: 'Kayaking',
    location: 'Lake Leman at Lausanne',
    price: 150,
    date: new Date(2025, 8, 18),
    minParticipants: 2,
    maxParticipants: 4,
    status: 'cancelled',
    id: 3,
    slug: 'kayaking-lake-leman-at-lausanne',
    duration: 3,
    userId: 1
  },
  {
    name: 'Paddle surf',
    location: 'Danube at Vienna',
    price: 125,
    date: new Date(2026, 10, 1),
    minParticipants: 6,
    maxParticipants: 9,
    status: 'published',
    id: 4,
    slug: 'paddle-surf-danube-at-vienna',
    duration: 2,
    userId: 1
  },
  {
    name: 'Kayaking',
    location: 'Danube at Vienna',
    price: 150,
    date: new Date(2026, 10, 1),
    minParticipants: 6,
    maxParticipants: 9,
    status: 'draft',
    id: 5,
    slug: 'kayaking-danube-at-vienna',
    duration: 3,
    userId: 1
  }
]
