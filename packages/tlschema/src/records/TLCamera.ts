import { BaseRecord, createRecordType, RecordId } from '@tldraw/store'
import { JsonObject } from '@tldraw/utils'
import { T } from '@tldraw/validate'
import { idValidator } from '../misc/id-validator'

/**
 * A camera record.
 *
 * @public
 */
export interface TLCamera extends BaseRecord<'camera', TLCameraId> {
	x: number
	y: number
	z: number
	meta: JsonObject
}

/**
 * The id of a camera record.
 *
 * @public */
export type TLCameraId = RecordId<TLCamera>

/** @internal */
export const cameraValidator: T.Validator<TLCamera> = T.model(
	'camera',
	T.object({
		typeName: T.literal('camera'),
		id: idValidator<TLCameraId>('camera'),
		x: T.number,
		y: T.number,
		z: T.number,
		meta: T.jsonValue as T.ObjectValidator<JsonObject>,
	})
)

/** @public */
export const CameraRecordType = createRecordType<TLCamera>('camera', {
	validator: cameraValidator,
	scope: 'session',
}).withDefaultProperties(
	(): Omit<TLCamera, 'id' | 'typeName'> => ({
		x: 0,
		y: 0,
		z: 1,
		meta: {},
	})
)
