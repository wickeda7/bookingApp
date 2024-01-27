import { Text, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import { useAuthContext } from '@contexts/AuthContext';
const ProfileScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`profileScreen:${key}`);
  }
  const { logout } = useAuthContext();
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar />

      <View style={{ backgroundColor: Colors.primary, flex: 1.8 }}>
        <Text
          style={{
            ...Fonts.White20Bold,
            margin: Default.fixPadding * 1.5,
          }}
        >
          {tr('profile')}
        </Text>
      </View>

      <View
        style={{
          flex: 8.2,
          backgroundColor: Colors.white,
        }}
      >
        <Image
          source={require('@assets/images/profile1.png')}
          style={{
            marginTop: -70,
            alignSelf: 'center',
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ ...Fonts.Black16Bold, textAlign: 'center' }}>Jenny Wilson</Text>
          <Text style={{ ...Fonts.Grey14Medium, textAlign: 'center' }}>Jennywilson@gmail.com</Text>

          <View
            style={{
              marginVertical: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'accountScreen' })}
            >
              <FontAwesome
                name='user-o'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                  textAlign: isRtl ? 'right' : 'left',
                }}
              >
                {tr('account')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'chatScreen' })}
            >
              <Ionicons
                name='chatbubble-ellipses-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('chat')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate('UserStack', { screen: 'favoriteScreen' })}
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
            >
              <Ionicons
                name='heart-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('favorite')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'languageScreen' })}
            >
              <Ionicons
                name='globe-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('languages')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'settingScreen' })}
            >
              <Ionicons
                name='notifications-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('notification')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'inviteFriendScreen' })}
            >
              <Ionicons
                name='share-social-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('invite')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('StoresStack', { screen: 'couponScreen' })}
            >
              <MaterialCommunityIcons
                name='ticket-percent-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('coupon')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: Default.fixPadding * 1.5,
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'termsOfServicesScreen' })}
            >
              <MaterialCommunityIcons
                name='clipboard-text-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('termsOfService')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                padding: Default.fixPadding * 1.5,
                alignItems: 'center',
              }}
              onPress={() => props.navigation.navigate('UserStack', { screen: 'helpSupportScreen' })}
            >
              <MaterialCommunityIcons
                name='help-circle-outline'
                size={25}
                color={Colors.primary}
                style={{ marginHorizontal: Default.fixPadding * 0.5, flex: 1 }}
              />
              <Text
                style={{
                  ...Fonts.Black16Medium,
                  flex: 8,
                }}
              >
                {tr('help')}
              </Text>

              <Ionicons
                name={isRtl ? 'chevron-back' : 'chevron-forward-outline'}
                size={25}
                color={Colors.black}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              flexDirection: isRtl ? 'row-reverse' : 'row',
              alignItems: 'center',
              marginBottom: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 1.5,
              padding: Default.fixPadding * 1.5,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <Ionicons
              name='log-out-outline'
              size={25}
              color={Colors.red}
              style={{ marginHorizontal: Default.fixPadding * 0.5 }}
            />
            <Text style={Fonts.Red16Medium}>{tr('logout')}</Text>
          </TouchableOpacity>

          <Modal animationType='fade' transparent={true} visible={visible}>
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
                  height: 90,
                  paddingHorizontal: Default.fixPadding * 1.5,
                  paddingVertical: Default.fixPadding * 1.5,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <Text style={{ ...Fonts.Black16Medium, textAlign: 'center' }}>{tr('areYouSure')}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginVertical: Default.fixPadding * 1.5,
                  }}
                >
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Text
                      style={{
                        ...Fonts.ExtraLightGrey18Medium,
                        marginHorizontal: Default.fixPadding * 2,
                      }}
                    >
                      {tr('cancel')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      logout();

                      setVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.Primary18Medium,
                        marginRight: Default.fixPadding,
                      }}
                    >
                      {tr('logout')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
