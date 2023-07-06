# withSpokenMessages

The 'withSpokenMessages' HOC is used to add accessibility features to block components in the editor. It provides a set of methods and properties that allow developers to handle spoken messages that are read out to users with visual impairments or those using screen readers.

By using WithSpokenMessages, developers can enhance the accessibility of their custom block components by providing appropriate messages and instructions that can be announced audibly to users interacting with the Block Editor.

## Usage

```jsx
import { withSpokenMessages, Button } from '@wordpress/components';

const MyComponentWithSpokenMessages = withSpokenMessages(
	( { speak, debouncedSpeak } ) => (
		<div>
			<Button
				variant="secondary"
				onClick={ () => speak( 'Spoken message' ) }
			>
				Speak
			</Button>
			<Button
				variant="secondary"
				onClick={ () => debouncedSpeak( 'Delayed message' ) }
			>
				Debounced Speak
			</Button>
		</div>
	)
);
```
