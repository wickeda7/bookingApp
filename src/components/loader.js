import React from 'react';
import { Modal, Text, View, ActivityIndicator } from 'react-native';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';

const Loader = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`loader:${key}`);
  }

  return (
    <Modal animationType='fade' transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.transparentBlack,
        }}
      >
        <View
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            ...Default.shadow,
          }}
        >
          <ActivityIndicator size='large' color={Colors.primary} />
          <Text style={{ ...Fonts.Primary15Bold }}>{tr('pleaseWait')}</Text>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
