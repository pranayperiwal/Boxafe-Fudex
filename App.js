/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppHeader from './src/components/AppHeader';
import DeliveryListSection from './src/components/DeliveryListSection';

import firestore from '@react-native-firebase/firestore';

import NfcManager from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const App = () => {
  const [tips, setTips] = useState(0);
  const [deliveryData, setdeliveryData] = useState([]);

  const itemRef = firestore().collection('items');

  useEffect(() => {
    async function getData() {
      let allData = [];
      let currentTips = 0;
      await itemRef.get().then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data['id'] = snapshot.id;
          allData.push(data);
          if (data.delivery_status == 'Delivered And Boxafed') {
            currentTips += data.tip;
          }
        });
        // console.log(allData);
        setdeliveryData(allData);
        setTips(currentTips);
      });
    }
    getData();
  });

  const deliveredStatusChange = data => {
    itemRef
      .doc(data.id)
      .update({
        delivery_status: 'Delivered',
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  const deliveredAndBoxafed = data => {
    itemRef
      .doc(data.id)
      .update({
        delivery_status: 'Delivered And Boxafed',
      })
      .then(() => {
        console.log('User updated!');
      });

    setTips(tips + data.tip);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar hidden={false} barStyle="default" backgroundColor="#61dafb" />
      <AppHeader tips={tips} />
      <DeliveryListSection
        deliveryData={deliveryData}
        deliveredStatusChange={deliveredStatusChange}
        deliveredAndBoxafed={deliveredAndBoxafed}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
