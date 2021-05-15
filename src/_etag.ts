/*!
 * Fork of jshttp/etag
 * @see {@link https://github.com/jshttp/etag}
 */
'use strict'
import fs, { Stats } from 'fs'
import { Md5 } from 'ts-md5/dist/md5'
import { btoa } from '@ctx-core/btoa'
const { toString } = Object.prototype
/**
 * Create a simple ETag.
 */
export function _etag(entity:Stats, options:_etag_opts_type) {
	if (entity == null) {
		throw new TypeError('argument entity is required')
	}
	// support fs.Stats object
	const isStats = _isStats(entity)
	const weak = options && typeof options.weak === 'boolean'
							 ? options.weak
							 : isStats
	// validate argument
	if (
		!isStats
		&& typeof entity !== 'string'
		&& !Buffer.isBuffer(entity)
	) {
		throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
	}
	// generate entity tag
	const tag = isStats
							? stattag(entity)
							: entitytag(entity)
	return weak ? `W/${tag}` : tag
}
/**
 * Determine if object is a Stats object.
 */
function _isStats(obj:any) {
	// genuine fs.Stats
	if (typeof fs.Stats === 'function' && obj instanceof fs.Stats) {
		return true
	}
	// quack quack
	return obj
		&& typeof obj === 'object'
		&& 'ctime' in obj
		&& toString.call(obj.ctime) === '[object Date]'
		&& 'mtime' in obj
		&& toString.call(obj.mtime) === '[object Date]'
		&& 'ino' in obj
		&& typeof obj.ino === 'number'
		&& 'size' in obj
		&& typeof obj.size === 'number'
}
/**
 * Generate a tag for a stat.
 */
function stattag(stat:Stats) {
	const mtime = stat.mtime.getTime().toString(16)
	const size = stat.size.toString(16)
	return `"${size}-${mtime}"`
}
/**
 * Generate an entity tag.
 */
function entitytag(entity:string|any) {
	if (entity.length === 0) {
		// fast-path empty
		return '"0-1B2M2Y8AsgTpgAmY7PhCfg"'
	}
	// compute hash of entity
	const hash = btoa(Md5.hashStr(entity) as string)
	// compute length of entity
	const len = typeof entity === 'string'
							? Buffer.byteLength(entity, 'utf8')
							: entity.length
	return `"${len.toString(16)}-${hash}"`
}
export interface _etag_opts_type {
	weak:boolean
}
