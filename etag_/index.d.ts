/// <reference types="node" />
import type { Stats } from 'node:fs'
/**
 * Create a simple ETag.
 */
export declare function etag_(entity:Stats, options:etag_opts__T):string
export interface etag_opts__T {
	weak:boolean
}
export { etag_ as _etag, }
