import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/base';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const DeliveryItemTile = ({
  item,
  deliveredStatusChange,
  toggleCorrectModal,
  toggleNotCorrectModal,
  deliveredAndBoxafed,
}) => {
  //trigger NFC reader
  const getCode = async code => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Please bring the device close to the boxafe lock!',
      });

      let cmd =
        Platform.OS === 'ios'
          ? NfcManager.sendMifareCommandIOS
          : NfcManager.transceive;

      resp = await cmd([0x3a, 4, 4]);
      let payloadLength = parseInt(resp.toString().split(',')[1]);
      let payloadPages = Math.ceil(payloadLength / 4);
      let startPage = 5;
      let endPage = startPage + payloadPages - 1;

      resp = await cmd([0x3a, startPage, endPage]);
      bytes = resp.toString().split(',');
      let text = '';

      for (let i = 7; i < bytes.length; i += 2) {
        if (parseInt(bytes[i]) === 254) {
          break;
        }

        text = text + String.fromCharCode(parseInt(bytes[i], 10));
      }

      if (text == String(code)) {
        toggleCorrectModal();
        deliveredAndBoxafed(item);
      } else {
        toggleNotCorrectModal();
      }
    } catch (ex) {
      console.log('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  if (item.delivery_status === 'Delivered') {
    return (
      <View style={styles.tile}>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.transactionID}>Track No:</Text>
            <Text style={styles.transactionID}>#{item.tracking_no}</Text>
            <Text style={[styles.statusText, {color: 'red'}]}>
              {item.delivery_status}
            </Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              title="Delivered"
              size="md"
              titleStyle={{fontSize: 14}}
              disabled
              containerStyle={{marginBottom: 10}}
            />
            <Button
              title="Get Code"
              size="md"
              titleStyle={{fontSize: 14}}
              color="#FF6600"
              onPress={() => {
                getCode(item.code);
              }}
            />
          </View>
        </View>
      </View>
    );
  } else if (item.delivery_status === 'Delivered And Boxafed') {
    return (
      <View style={styles.tile}>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.transactionID}>Track No:</Text>
            <Text style={styles.transactionID}>#{item.tracking_no}</Text>
            <Text style={[styles.statusText, {color: 'red'}]}>
              {item.delivery_status}
            </Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              title="Delivered"
              size="md"
              titleStyle={{fontSize: 14}}
              disabled
              containerStyle={{marginBottom: 10}}
            />
            <Button
              disabled
              title="Get Code"
              size="md"
              titleStyle={{fontSize: 14}}
              color="#FF6600"
              onPress={() => {
                getCode(item.code);
              }}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.tile}>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.transactionID}>Track No:</Text>
            <Text style={styles.transactionID}>#{item.tracking_no}</Text>
            <Text style={styles.statusText}>{item.delivery_status}</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              title="Delivered"
              size="md"
              titleStyle={{fontSize: 14}}
              containerStyle={{marginBottom: 10}}
              onPress={() => {
                deliveredStatusChange(item);
              }}
            />
            <Button
              title="Get Code"
              size="md"
              titleStyle={{fontSize: 14}}
              color="#FF6600"
              onPress={() => {
                getCode(item.code);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
};

export default DeliveryItemTile;

const styles = StyleSheet.create({
  tile: {
    height: 120,
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionID: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
  },
});
