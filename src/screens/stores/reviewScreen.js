import { Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import { useStoreContext } from '@contexts/StoreContext';
import Loader from '@components/loader';
import ReviewContent from '@components/reviewContent';
import { useDispatch, useSelector } from 'react-redux';
const ReviewScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { reviews, loading, selectedStore } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`reviewScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.pop();
    return true;
  };
  useEffect(() => {
    // if (!reviews) dispatch(getReviews({ storeId: selectedStore.id }));

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  return null;
  return (
    <View style={{ flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {reviews &&
          reviews.map((review, index) => {
            return <ReviewContent item={review} index={index} reviews={reviews} />;
          })}
      </ScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('bookAppointmentScreen')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: Default.fixPadding * 1.5,
          backgroundColor: Colors.primary,
        }}
      >
        <Text style={Fonts.White18Bold}>{tr('bookAppointment')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewScreen;
