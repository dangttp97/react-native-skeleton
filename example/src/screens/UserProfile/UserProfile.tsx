import React, { useEffect, useState } from 'react';
import { SkeletonFlatList } from 'react-native-skeleton';
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@navigation';
import FastImage from 'react-native-fast-image';
import { useFetch } from '@hooks';
import { CONSTANTS } from '@constants';
import { delay } from 'lodash';

export const UserProfile = () => {
  const route = useRoute<'UserProfile'>();
  const { userProfile } = route.params;
  const { request } = useFetch();

  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserImages = async () => {
    return request({
      baseUrl: CONSTANTS.baseUrl,
      path: CONSTANTS.paths.getUserPhotos(userProfile.username),
      method: 'get',
    })
      .then(value => {
        console.log('Data:', value);
        setPhotos(value);
        return Promise.resolve();
      })
      .catch(reason => Promise.reject(reason));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUserImages().then(() => {
      delay(() => setIsLoading(false), 2000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = (info: ListRenderItemInfo<any>) => {
    return (
      <FastImage
        source={{
          uri: info.item.urls ? info.item.urls.regular : CONSTANTS.defaultImage,
        }}
        style={styles.image}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FastImage
          source={{ uri: userProfile.profile_image.medium }}
          style={styles.avatar}
        />
        <View style={styles.userInfoTextWrapper}>
          <Text style={styles.nameText}>{userProfile.name}</Text>
          <Text style={styles.bioText}>{userProfile.bio}</Text>
        </View>
      </View>
      <SkeletonFlatList
        isLoading={isLoading}
        data={photos}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  header: {
    borderBottomColor: '#D3D3D3',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userInfoTextWrapper: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingRight: 10,
  },
  nameText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10,
  },
  bioText: {
    color: 'gray',
    fontSize: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
});
