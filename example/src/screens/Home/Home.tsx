import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SkeletonFlatList, withSkeletonLoading } from 'react-native-skeleton';
import { useFetch } from '@hooks';
import { CONSTANTS } from '@constants';
import { delay } from 'lodash';
import { useNavigation } from '@navigation';
import FastImage from 'react-native-fast-image';
import { IcHeart, IcMessage } from '@assets';

const SkeletonTouchable = withSkeletonLoading(TouchableOpacity);

export const Home = () => {
  const navigation = useNavigation();
  const { request } = useFetch();
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    requestData().then(() => {
      delay(() => setIsLoading(false), 2000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestData = async () => {
    return request({
      baseUrl: CONSTANTS.baseUrl,
      path: CONSTANTS.paths.getPhotos,
      method: 'get',
    })
      .then(value => {
        console.log('data:', value);
        setData(value);
        return Promise.resolve();
      })
      .catch(reason => {
        return Promise.reject(reason);
      });
  };

  const onPressItem = (userProfile: any) => {
    navigation.navigate('UserProfile', { userProfile });
  };

  const renderItem = ({ item }: ListRenderItemInfo<any>) => {
    const user = item.user;

    return (
      <SkeletonTouchable
        isLoading={isLoading}
        onPress={() => onPressItem(user)}
        style={styles.item}>
        <View>
          <FastImage
            source={{
              uri: user ? user.profile_image.medium : CONSTANTS.defaultImage,
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user ? user.name : ''}</Text>
        </View>
        <FastImage
          source={{
            uri: user ? user.urls.regular : CONSTANTS.defaultImage,
          }}
          style={styles.image}
        />
        <View style={styles.actionWrapper}>
          <TouchableOpacity>
            <IcHeart />
          </TouchableOpacity>
          <TouchableOpacity>
            <IcMessage />
          </TouchableOpacity>
        </View>
      </SkeletonTouchable>
    );
  };

  return (
    <View style={styles.container}>
      <SkeletonFlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          requestData().then(() => setRefreshing(false));
        }}
        numberOfDummy={2}
        isLoading={isLoading || refreshing}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  separator: {
    height: 10,
  },
  list: {
    flex: 1,
    paddingVertical: 20,
  },
  item: {
    borderRadius: 10,
    padding: 20,
  },
  image: {
    borderRadius: 20,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width - 40,
  },
  actionWrapper: {
    flexDirection: 'row',
  },
  username: {
    fontWeight: '600',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
