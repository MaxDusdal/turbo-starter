import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// Re-export all types (NodeNext requires .js extension in source import specifiers)
export * from './types.js'