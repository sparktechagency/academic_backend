"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbackFn = void 0;
const callbackFn = (fn, data) => {
    if (typeof fn === 'function') {
        fn(data);
    }
    return;
};
exports.callbackFn = callbackFn;
