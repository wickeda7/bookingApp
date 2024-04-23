import { Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
import Loader from '@components/loader';
import ReviewContent from '@components/reviewContent';

const MainReviewScreen = (props) => {
  const { t, i18n } = useTranslation();
  const { getReviews, reviews, loading } = useAuthContext();
  const isRtl = i18n.dir() === 'rtl';
  const specialistId = props.route.params?.specialistId ? props.route.params?.specialistId : '';
  const employee = props.route.params?.employee ? props.route.params?.employee : '';
  function tr(key) {
    return t(`mainReviewScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    if (!reviews) getReviews(specialistId);
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  if (loading) return <Loader visible={true} />;
  if (!reviews) return null;
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding }}
          //onPress={() => props.navigation.navigate('specialistProfileScreen', { employee: employee })}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text style={Fonts.White18Bold}>{tr('review')}</Text>
      </View>

      <FlatList
        data={reviews}
        renderItem={({ item, index }) => <ReviewContent item={item} index={index} reviews={reviews} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MainReviewScreen;
