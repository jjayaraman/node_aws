export const user = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    address1: { type: 'string' },
    address2: { type: 'string' },
    city: { type: 'string' },
    postcode: { type: 'string' },
    country: { type: 'string' },
  },
  required: ['name'],
} as const

export const users = [user] as const
