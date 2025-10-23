// [41] src/utils/bytes.ts
export const formatMB = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
export const creditsForSize = (bytes: number) => Math.max(1, Math.ceil(bytes / (10 * 1024 * 1024)));
