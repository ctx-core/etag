/// <reference types="node" />
import { Stats } from 'fs';
/**
 * Create a simple ETag.
 */
export declare function _etag(entity: Stats, options: _etag_opts_type): string;
export interface _etag_opts_type {
    weak: boolean;
}
