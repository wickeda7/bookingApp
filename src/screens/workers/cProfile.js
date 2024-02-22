import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useRef } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import RBSheet from 'react-native-raw-bottom-sheet';
import CProfileTop from '@navigation/CProfileTop';
import { useNavigation } from '@react-navigation/native';
import MyStatusBar from '@components/myStatusBar';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const CProfile = (props) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const { t, i18n } = useTranslation();
  function tr(key) {
    return t(`clientsScreen:${key}`);
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View style={{ flex: 9 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ marginHorizontal: Default.fixPadding * 1.5 }}
              onPress={() => props.navigation.navigate('clients')}
            >
              <Ionicons name={'arrow-back'} size={30} color={Colors.white} />
            </TouchableOpacity>
            <Text style={Fonts.White18Bold}>{tr('clientprodfile')}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
              flex: 1,
            }}
          >
            <Ionicons name='cog-outline' size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refRBSheet}
          height={300}
          openDuration={100}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: Colors.white,
            },
          }}
        >
          <View style={{ marginTop: 15, marginHorizontal: 20 }}>
            <Text style={[{ fontSize: 20, color: Colors.black }]}>Action</Text>

            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
                // navigation.navigate('NAppoinment');
              }}
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
            >
              <Icons name='plus' size={24} color={Colors.black} />
              <Text style={[{ fontSize: 16, color: Colors.black, marginLeft: 10, flex: 1 }]}>New appointment</Text>
            </TouchableOpacity>
            <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Icons name='pencil-outline' size={24} color={Colors.black} />
              <Text style={[{ fontSize: 14, color: Colors.black, marginLeft: 10, flex: 1 }]}>Edit</Text>
            </TouchableOpacity>
            <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                source={require('@assets/images/s16.png')}
                resizeMode='stretch'
                style={{ tintColor: Colors.black, height: 17, width: 17 }}
              />
              <Text style={[{ fontSize: 14, color: Colors.black, marginLeft: 15, flex: 1 }]}>Block</Text>
            </TouchableOpacity>
            <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Icons name='delete-outline' size={24} color={Colors.black} />
              <Text style={[{ fontSize: 14, color: Colors.black, marginLeft: 10, flex: 1 }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
      <View style={{ padding: 20, backgroundColor: Colors.white1, paddingTop: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 66,
              width: 66,
              borderRadius: 33,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text style={[{ fontSize: 24, color: Colors.primary }]}>AJ</Text>
          </View>
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={[{ fontSize: 24, color: Colors.black }]}>Andreea Jones</Text>
            <Text style={[{ fontSize: 10, color: Colors.black }]}>NEW CLIENT</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.white,
              borderColor: '#EDEDED',
              borderWidth: 1,
            }}
          >
            <Icon name='mail-outline' size={16} color={Colors.black} />
          </View>
          <Text style={[{ fontSize: 14, color: Colors.black, marginLeft: 10, flex: 1 }]}>louisa.banks@mail.com</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.white,
              borderColor: '#EDEDED',
              borderWidth: 1,
            }}
          >
            <Icon name='female-outline' size={16} color={Colors.black} />
          </View>
          <Text style={[{ fontSize: 14, color: Colors.black, marginLeft: 10, flex: 1 }]}>Female</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.white,
              borderColor: '#EDEDED',
              borderWidth: 1,
            }}
          >
            <Icon name='notifications-outline' size={16} color={Colors.black} />
          </View>
          <Text style={[{ fontSize: 14, color: Colors.black, marginLeft: 10, flex: 1 }]}>
            Accept marketing notifications
          </Text>
        </View>
      </View>
      <View style={[Fonts.Divider, { backgroundColor: Colors.bord }]}></View>
      <View style={[{ flex: 1, paddingHorizontal: 20, backgroundColor: Colors.white }]}>
        <Text style={[{ fontSize: 24, color: Colors.black, marginTop: 10 }]}>$1200</Text>
        <Text style={[{ fontSize: 12, color: Colors.disable }]}>Total sales</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <View>
            <Text style={[{ fontSize: 16, color: Colors.black }]}>54</Text>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>Total bookings</Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={[{ fontSize: 16, color: Colors.black }]}>51</Text>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>Completed</Text>
          </View>
          <View>
            <Text style={[{ fontSize: 16, color: Colors.black }]}>2</Text>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>Cancelled</Text>
          </View>
        </View>

        <CProfileTop />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CProfile;
