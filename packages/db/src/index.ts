import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// Export all types from the types module
export * from './types'