# react-native-skeleton

Skeleton Loading view for React Native app

## Installation

```sh
npm install react-native-skeleton
```

## Usage

```js
import SkeletonWrapper from 'react-native-skeleton';

// ...

<SkeletonWrapper isLoading={true} style={{ backgroundColor: 'white' }}>
  Your component's here
</SkeletonWrapper>;
```

Library implements FlatList for showing contents when loading

```js
import {SkeletonFlatList} from 'react-native-skeleton';

// ...

<SkeletonFlatList isLoading={true} {...rest of FlatList props} />

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
