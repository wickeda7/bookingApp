import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, Default, Fonts } from '@constants/style';
import { STRAPIURL } from '@env';
const ReviewContent = ({ item, index, reviews }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isEnd = index === reviews.length - 1;
  const {
    content,
    reviewed_by: {
      firstName,
      lastName,
      userInfo: { profileImg },
    },
  } = item;
  let topImage = `${STRAPIURL}${profileImg.url}`;
  return (
    <View
      style={{
        marginHorizontal: Default.fixPadding * 1.5,
        marginBottom: isEnd ? Default.fixPadding * 1.5 : 0,
        marginTop: Default.fixPadding * 1.5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        ...Default.shadow,
      }}
    >
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          paddingHorizontal: Default.fixPadding,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: Colors.regularGrey,
        }}
      >
        <Image source={{ uri: topImage }} style={{ width: 66, height: 66 }} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: isRtl ? 'flex-end' : 'flex-start',
          }}
        >
          <Text style={Fonts.Black16Medium}>
            {firstName} {lastName}
          </Text>
          <Image source={require('@assets/images/star5.png')} />
        </View>
      </View>

      <Text
        style={{
          ...Fonts.Grey14Medium,
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding * 1.5,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default ReviewContent;

const styles = StyleSheet.create({});
