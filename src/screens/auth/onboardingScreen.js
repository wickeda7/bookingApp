import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, FlatList, View, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { Colors, Fonts, Default } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import Toast from 'react-native-root-toast';

const { width } = Dimensions.get('window');

const OnboardingScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == 'rtl';

  function tr(key) {
    return t(`onboardingScreen:${key}`);
  }

  const toastHandler = () => {
    Toast.show(tr('tapBack'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: Colors.black,
      textColor: Colors.white,
    });
  };

  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
      toastHandler();
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => BackHandler.removeEventListener('hardwareBackPress', backHandler.remove());
  });

  const slides = [
    {
      id: '1',
      image: require('@assets/images/onBoarding1.png'),
      title: tr('title1'),
      subtitle: tr('Description'),
    },
    {
      id: '2',
      image: require('@assets/images/onBoarding2.png'),
      title: tr('title2'),
      subtitle: tr('Description'),
    },
    {
      id: '3',
      image: require('@assets/images/onBoarding3.png'),
      title: tr('title3'),
      subtitle: tr('Description'),
    },
  ];

  const Slide = ({ item }) => {
    return (
      <View style={{ alignItems: 'center', width: width }}>
        <Image
          source={item.image}
          style={{
            width,
            resizeMode: 'cover',
          }}
        />
        <Text
          style={{
            ...Fonts.Black24Bold,
            textAlign: 'center',
            maxWidth: '70%',
            marginTop: Default.fixPadding,
            paddingVertical: Default.fixPadding * 1.5,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            ...Fonts.Grey14Medium,
            maxWidth: '65%',
            textAlign: 'center',
          }}
        >
          {item.subtitle}
        </Text>
      </View>
    );
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const Footer = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: 'center',
            marginBottom: Default.fixPadding,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: Colors.primary,
                  width: 35,
                  height: 6,
                  borderRadius: 10,
                },
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: Default.fixPadding * 2 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('loginScreen')}>
                <Text style={{ ...Fonts.White18Bold }}>{tr('started')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={() => props.navigation.navigate('loginScreen')}
              >
                <Text style={Fonts.Primary16Bold}>{tr('skip')}</Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide} style={styles.btn}>
                <Text
                  style={{
                    ...Fonts.White18Bold,
                  }}
                >
                  {tr('next')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={Slide}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 25,
    height: 6,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
export default OnboardingScreen;
