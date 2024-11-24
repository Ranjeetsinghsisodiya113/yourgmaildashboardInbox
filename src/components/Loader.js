import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View, Modal} from 'react-native';
import {LoaderContext} from './LoaderContext';
import { mobileW } from './Colorsfont';

const Loader = () => {
  const {loading} = useContext(LoaderContext);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size={'small'}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: mobileW*15/100,
    width:  mobileW*15/100,
    borderRadius: mobileW*2.5/100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
