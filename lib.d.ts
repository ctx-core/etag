/// <reference types="node" />
import fs from 'fs';
/**
 * Create a simple ETag.
 */
export declare function _etag(entity: string | Buffer | typeof fs.Stats, options: _etag_opts_type): string;
export declare type _etag_opts_type = {
    weak: boolean;
};
