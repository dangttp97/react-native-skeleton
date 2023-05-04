import MaskedView from '@react-native-masked-view/masked-view';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import {
  View,
  StyleSheet,
  LayoutRectangle,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';

const DEFAULT_DURATION = 2000;
const DEFAULT_BACKGROUND_COLOR = '#e3e3e3';
const DEFAULT_HIGHLIGHT_COLOR = '#ffffff';

export type SkeletonItemProps = PropsWithChildren<{
  key?: number | string;
  isLoading: boolean;
  backgroundColor?: ColorValue;
  highlightColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
}>;

export const SkeletonItem = ({ ...props }: SkeletonItemProps) => {
  const {
    children,
    isLoading,
    backgroundColor = DEFAULT_BACKGROUND_COLOR,
    highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  } = props;
  const [layout, setLayout] = useState<LayoutRectangle | undefined>(undefined);
  const shared = useSharedValue(0);

  useEffect(() => {
    shared.value = withRepeat(
      withTiming(1, { duration: DEFAULT_DURATION }),
      Infinity
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateX: interpolate(
            shared.value,
            [0, 1],
            [layout ? -layout.width : 0, layout ? layout.width : 0]
          ),
        },
      ],
    };
  });

  if (!layout?.width && !layout?.height) {
    return (
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  const getChildrenWrapper = () => {
    let wrappedChildren = React.Children.map(children, (child, index) => {
      const childStyle = child.props.style;
      if (child.type === 'Text' || child.type === 'Image') {
        return (
          <View
            key={index}
            style={[
              childStyle,
              isLoading ? { backgroundColor: backgroundColor } : undefined,
            ]}
          >
            {child}
          </View>
        );
      }
      return (
        <View
          style={[
            childStyle,
            isLoading ? { backgroundColor: backgroundColor } : undefined,
          ]}
        >
          {child}
        </View>
      );
    });

    return wrappedChildren ? (
      <>{wrappedChildren}</>
    ) : (
      <View
        style={isLoading ? { backgroundColor: backgroundColor } : undefined}
      >
        {children}
      </View>
    );
  };

  return isLoading ? (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={getChildrenWrapper()}
    >
      <View style={[styles.background, { backgroundColor: backgroundColor }]} />
      <Animated.View style={[animatedStyles, StyleSheet.absoluteFill]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={['transparent', 'black', 'transparent']}
            />
          }
        >
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: highlightColor },
            ]}
          />
        </MaskedView>
      </Animated.View>
    </MaskedView>
  ) : (
    <>{children}</>
  );
};

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    overflow: 'hidden',
  },
});
