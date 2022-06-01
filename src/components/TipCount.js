import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'

const TipCount = ({tips}) => {


  return (
    <View style={styles.tipStyle}>
      <Text style={{color:'white'}}>$</Text>
      <Text style={{fontSize:28, color:'white', marginLeft: 3}}>{tips}</Text>
    </View>
  )
}

export default TipCount

const styles = StyleSheet.create({
  tipStyle: {
    color:'white',
    flexDirection:'row'
  }
})