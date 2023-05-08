import React, { PropsWithChildren } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}>;

export const Button = ({ ...props }: ButtonProps) => {
  const { onPress, containerStyle, textStyle, children } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {React.isValidElement(children) ? (
        children
      ) : (
        <Text style={[styles.title, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C13584',
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
  },
});
