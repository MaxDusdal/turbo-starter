import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const Post = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    body: z.string().min(1),
    createdAt: z.string().datetime(),
});

export const CreatePostInput = z.object({
    title: z.string().min(1),
    body: z.string().min(1),
});

export const ErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
});

export const api = c.router(
    {
        health: {
            method: 'GET',
            path: '/health',
            responses: { 200: z.object({ ok: z.literal(true) }) },
        },
        // posts: c.router({
        //     list: {
        //         method: 'GET',
        //         path: '/posts',
        //         query: z.object({
        //             cursor: z.string().uuid().nullish(),
        //             limit: z.number().int().min(1).max(100).default(20),
        //         }),
        //         responses: {
        //             200: z.object({
        //                 items: z.array(Post),
        //                 nextCursor: z.string().uuid().nullable(),
        //             }),
        //         },
        //     },
        //     byId: {
        //         method: 'GET',
        //         path: '/posts/:id',
        //         responses: {
        //             200: Post,
        //             404: ErrorSchema,
        //         },
        //     },
        //     create: {
        //         method: 'POST',
        //         path: '/posts',
        //         body: CreatePostInput,
        //         responses: {
        //             201: Post,
        //             400: ErrorSchema,
        //         },
        //     },
        // }),
    },
    { pathPrefix: '/v1' }
);
