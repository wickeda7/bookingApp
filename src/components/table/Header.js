import { Text, View } from 'react-native';
import React from 'react';
import Style from '@theme/style';
import { DefaultImage } from '@constants/style';
import { useTranslation } from 'react-i18next';
const Header = ({ data, type, styleHeader, styleText }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`${type}:${key}`);
  }
  const header = styleHeader ? styleHeader :'tableHeader';
  const textSize = styleText ? styleText : 'tableHeaderText15Medium'
  return (
    <View style={[Style[header], { flexDirection: 'row' }]}>
      {data.map((item, index) => (
        <Text key={index} style={[Style[textSize], { flex: item.size }]}>
          {tr(item.name)}
        </Text>
      ))}
    </View>
  );
};

export default Header;
