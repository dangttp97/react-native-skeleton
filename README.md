# @dangttp/react-native-skeleton

Skeleton Loading animation for React Native app. Adopted with new architecture for performance app

## Installation

```sh
npm install @dangttp/react-native-skeleton
```

or

```sh
yarn add @dangttp/react-native-skeleton
```

## Usage

```js
import SkeletonWrapper from '@dangttp/react-native-skeleton';

// ...

<SkeletonWrapper isLoading={true} style={{ backgroundColor: 'white' }}>
  {/** Your component's here */}
</SkeletonWrapper>;
```

Library implements FlatList for showing contents when loading

```js
import {SkeletonFlatList} from '@dangttp/react-native-skeleton';

// ...

<SkeletonFlatList isLoading={true} {...rest of FlatList props} />

```

Library also provides HOC implement by using

```js
const NamedComponent = withSkeletonLoading(WrappedComponent);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
