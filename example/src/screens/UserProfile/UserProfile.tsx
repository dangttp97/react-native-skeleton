import React from 'react';
import SkeletonWrapper from 'react-native-skeleton';
import { StyleSheet, View } from 'react-native';

export const UserProfile = () => {
  return (
    <SkeletonWrapper isLoading={true} style={styles.container}>
      <View></View>
    </SkeletonWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
