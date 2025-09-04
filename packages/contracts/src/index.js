"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.ErrorSchema = exports.CreatePostInput = exports.Post = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var c = (0, core_1.initContract)();
exports.Post = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1),
    body: zod_1.z.string().min(1),
    createdAt: zod_1.z.string().datetime(),
});
exports.CreatePostInput = zod_1.z.object({
    title: zod_1.z.string().min(1),
    body: zod_1.z.string().min(1),
});
exports.ErrorSchema = zod_1.z.object({
    code: zod_1.z.string(),
    message: zod_1.z.string(),
});
exports.api = c.router({
    health: {
        method: 'GET',
        path: '/health',
        responses: { 200: zod_1.z.object({ ok: zod_1.z.literal(true) }) },
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
}, { pathPrefix: '/v1' });
