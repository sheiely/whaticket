"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_OPT_LIMITER_DURATION = exports.REDIS_OPT_LIMITER_MAX = exports.REDIS_URI_CONNECTION = void 0;
exports.REDIS_URI_CONNECTION = process.env.REDIS_URI || "";
exports.REDIS_OPT_LIMITER_MAX = process.env.REDIS_OPT_LIMITER_MAX || 1;
exports.REDIS_OPT_LIMITER_DURATION = process.env.REDIS_OPT_LIMITER_DURATION || 3000;
