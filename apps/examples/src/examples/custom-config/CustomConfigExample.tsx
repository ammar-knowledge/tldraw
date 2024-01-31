import { MigrationsConfigBuilder, Tldraw, tldrawMigrations } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { CardShapeTool } from './CardShape/CardShapeTool'
import { CardShapeUtil } from './CardShape/CardShapeUtil'
import { cardShapeMigrations } from './CardShape/card-shape-migrations'
import { uiOverrides } from './ui-overrides'

// There's a guide at the bottom of this file!

// [1]
const customShapeUtils = [CardShapeUtil]
const customTools = [CardShapeTool]

// TODO: add link to migration docs
// TODO: maybe even move migrations to a separate example
const migrations = new MigrationsConfigBuilder()
	// tldraw's migration sequence should always be passed in
	.addSequence(tldrawMigrations)
	// then pass in your own migration sequence
	.addSequence(cardShapeMigrations)
	.setOrder([
		// You will need to hard-code all of the tldraw migration ids in order here.
		'com.tldraw/000_InitialMigration',
		// And finally add your own migration ids.
		'com.tldraw.card-shape-example/001_add_some_property',
		// This array must only ever be appended to, and the ids may never change.
		// So it's helpful to hard-code the strings like this.
		// If you upgrade tldraw and the new version has extra migrations you will be
		// asked to add them at the end here.
	])

// [2]
export default function CustomConfigExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw
				// Pass in the array of custom shape classes
				shapeUtils={customShapeUtils}
				migrations={migrations}
				// Pass in the array of custom tool classes
				tools={customTools}
				// Pass in any overrides to the user interface
				overrides={uiOverrides}
			/>
		</div>
	)
}

/* 
Introduction:

This example shows how to create a custom shape, and add your own icon for it to the toolbar.
Check out CardShapeUtil.tsx and CardShapeTool.tsx to see how we define the shape util and tool. 
Check out ui-overrides.ts for more info on how to add your icon to the toolbar.

[1] 
We define an array to hold the custom shape util and custom tool. It's important to do this outside of
any React component so that this array doesn't get redefined on every render.

[2]
Now we'll pass these arrays into the Tldraw component's props, along with our ui overrides.


*/
