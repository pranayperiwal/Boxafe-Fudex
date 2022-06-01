import * as React from 'react';
import {Header, Icon} from '@rneui/base';
import TipCount from './TipCount';
import {Text} from 'react-native';

export default ({tips}) => {
  const Heading = () => {
    return (
      <Text style={{color: '#fff', fontSize: 28, fontWeight: 'bold'}}>
        Fud<Text style={{color: '#FF6600'}}>Ex</Text>
      </Text>
    );
  };
  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={<Heading />}
      centerContainerStyle={{}}
      containerStyle={{width: '100%', backgroundColor: '#4D148C', height: 65}}
      leftComponent={{icon: 'person', color: '#fff', size: 28}}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="left"
      rightComponent={<TipCount tips={tips} />}
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  );
};
