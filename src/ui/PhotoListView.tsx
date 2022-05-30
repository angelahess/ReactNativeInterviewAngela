import React, {FC, ReactElement} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {Link} from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {store} from '../store';
import {PhotosState, removePhoto} from '../store/photos';
import {expandPath} from '../utils/filePath';
import {useDispatch, useSelector} from 'react-redux';

const PhotoListView: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const content = [];
  for (let i = 0; i < 50; i++) {
    content.push(<Text content={'Welcome' + i} key={i} />);
  }
  const photos = useSelector((state: {'photos': PhotosState}) => state.photos.value);
  return (
    <ScrollView>
      <View>
        <Link to="/capture" activeOpacity={0.8}>
          <View style={styles.takePhotoButton}>
            <Icon name="camera" style={styles.cameraItemIcon} />
            <Text content="New Item" />
          </View>
        </Link>
      </View>
      <View>
        {photos.map(photoItem => {
          return (
            <View key={photoItem.photoFilePath} style={styles.photoItem}>
              <Text content={photoItem.lotNumber || 'No lot number'} />
              <Image
                source={{uri: expandPath(photoItem.photoFilePath)}}
                style={styles.photo}
              />
              <TouchableOpacity 
                onPress={() => dispatch(removePhoto(photoItem))}>
              <Image
                source={require('../images/delete.png')}
                style={styles.delete}
              />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  takePhotoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 30,
  },
  cameraItemIcon: {
    color: 'black',
    fontSize: 45,
  },
  photoItem: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  photo: {
    width: 75,
    height: 100,
    marginHorizontal: 10,
  },
  delete: {
    width: 25,
    height: 25,
  }
});

export default PhotoListView;
