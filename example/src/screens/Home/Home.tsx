import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SkeletonFlatList } from 'react-native-skeleton';
import { useFetch } from '../../hooks';
import { CONSTANTS } from '@constants';
import { delay } from 'lodash';

export const Home = () => {
  const { request } = useFetch();
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    request({
      baseUrl: CONSTANTS.baseUrl,
      path: CONSTANTS.paths.getPhotos,
      method: 'get',
    }).then(value => {
      delay(() => setIsLoading(false), 2000);
      setData(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<any>) => {
    console.log('Item:', item);
    return (
      <ImageBackground
        source={{
          uri: item.urls ? item.urls.regular : CONSTANTS.defaultImage,
        }}
        style={styles.image}
        imageStyle={styles.image}>
        <Text style={styles.description}>
          {item.description ?? item.alt_description}
        </Text>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container}>
      <SkeletonFlatList
        numberOfDummy={2}
        isLoading={isLoading}
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
  button: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  separator: {
    height: 10,
  },
  list: {
    flex: 1,
  },
  image: {
    borderRadius: 20,
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width - 40,
  },
  description: {
    marginTop: 'auto',
    marginBottom: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
