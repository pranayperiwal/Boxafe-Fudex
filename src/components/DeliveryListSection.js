import {StyleSheet, Text, View, FlatList} from 'react-native';
import DeliveryItemTile from './DeliveryItemTile';
import React, {useState} from 'react';
import {Button, Icon} from '@rneui/base';
// import {Overlay} from '@rneui/base';

// import {Modal, Portal, Provider} from 'react-native-paper';

import Modal from 'react-native-modal';

const DeliveryListSection = ({
  deliveryData,
  deliveredStatusChange,
  deliveredAndBoxafed,
}) => {
  const [isCorrectModalVisible, setCorrectModalVisible] = useState(false);

  const toggleCorrectModal = () => {
    setCorrectModalVisible(!isCorrectModalVisible);
  };

  const [isNotCorrectModalVisible, setNotCorrectModalVisible] = useState(false);

  const toggleNotCorrectModal = () => {
    setNotCorrectModalVisible(!isNotCorrectModalVisible);
  };

  const renderItem = ({item}) =>
    DeliveryItemTile({
      item,
      deliveredStatusChange,
      toggleCorrectModal,
      toggleNotCorrectModal,
      deliveredAndBoxafed,
    });

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isCorrectModalVisible}
        contentContainerStyle={styles.modalView}
        onBackdropPress={toggleCorrectModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="check-circle-o"
              type="font-awesome"
              color="green"
              size={40}
              iconStyle={{marginRight: 10}}
            />
            <Text style={styles.textPrimary}>Code was successful!</Text>
            <Text style={styles.textSecondary}>
              Please close the boxafe after you have placed the parcels in!
            </Text>
            <Text style={styles.textSecondary}>Tips added!</Text>

            <Button
              buttonStyle={styles.button}
              title="Close"
              onPress={toggleCorrectModal}
            />
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isNotCorrectModalVisible}
        contentContainerStyle={styles.modalView}
        onBackdropPress={toggleNotCorrectModal}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {height: 250}]}>
            <Icon
              name="exclamation-triangle"
              type="font-awesome"
              color="red"
              size={40}
              iconStyle={{marginRight: 10}}
            />
            <Text style={styles.textPrimary}>Code was not right!</Text>
            <Text style={styles.textSecondary}>Please try again!</Text>

            <Button
              buttonStyle={styles.button}
              title="Close"
              onPress={toggleNotCorrectModal}
            />
          </View>
        </View>
      </Modal>

      <FlatList
        data={deliveryData}
        renderItem={renderItem}
        keyExtractor={item => item.tracking_no}
      />
      {/* <NfcResultModal /> */}
    </View>
  );
};

export default DeliveryListSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 17,
    marginHorizontal: 10,
  },

  modalView: {
    width: 275,
    height: 315,
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
