import React, { PropsWithChildren } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type ButtonProps = PropsWithChildren<{
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}>;

export const Button = ({ ...props }: ButtonProps) => {
  const { onPress, containerStyle, textStyle, children } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[
          '#405DE6',
          '#5851DB',
          '#833AB4',
          '#C13584',
          '#E1306C',
          '#FD1D1D',
          '#F56040',
          '#F77737',
          '#FCAF45',
          '#FFDC80',
        ]}
        style={[styles.container, containerStyle]}>
        {React.isValidElement(children) ? (
          children
        ) : (
          <Text style={[styles.title, textStyle]}>{children}</Text>
        )}
      </LinearGradient>
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
