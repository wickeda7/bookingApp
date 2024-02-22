import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const Clients = (props) => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState();
  const refRBSheet = useRef();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`clientsScreen:${key}`);
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <View style={{ flex: 9 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...Fonts.White20Bold }}>{tr('clients')}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
              flex: 1,
            }}
          >
            <Ionicons name='cog-outline' size={30} color={Colors.white} />
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheet}
            height={320}
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
              <Text style={[Fonts.Black18Medium]}>Get From</Text>

              <Text style={[Fonts.Black14, { marginTop: 20 }]}>Download Excel</Text>

              <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

              <Text style={[Fonts.Black14]}>Import Clients</Text>

              <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

              <Text style={[Fonts.Black14]}>Download CSV</Text>

              <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

              <Text style={[Fonts.Black14]}>Merge Clients</Text>
            </View>
          </RBSheet>
        </View>
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Ionicons name='search-outline' size={20} color={Colors.grey} style={{ flex: 0.8, alignSelf: 'center' }} />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder={tr('search')}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              ...Fonts.Black16Medium,
              flex: 8.4,
              textAlign: isRtl ? 'right' : 'left',
              alignSelf: 'center',
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>
      </View>
      <View
        style={[{ backgroundColor: Colors.bg, marginTop: 20, marginHorizontal: 10, flex: 1, paddingHorizontal: 20 }]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('WorkersStack', { screen: 'CProfile' })}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                height: 45,
                width: 45,
                backgroundColor: Colors.lightPrimary,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={[{ color: Colors.primary, fontSize: 14 }]}>AJ</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={[{ color: Colors.black, fontSize: 14 }]}>Andreea Jones</Text>
              <Text style={[{ color: Colors.disable, fontSize: 12 }]}>louisa.banks@mail.com</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color={Colors.disable}></Ionicons>
          </TouchableOpacity>
          <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 20 }]}></View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CProfile')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                height: 45,
                width: 45,
                backgroundColor: Colors.lightPrimary,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={[{ color: Colors.primary, fontSize: 14 }]}>JB</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={[{ color: Colors.black, fontSize: 14 }]}>history of clients </Text>
              <Text style={[{ color: Colors.disable, fontSize: 12 }]}>and their appointments and invoices</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color={Colors.disable}></Ionicons>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Clients;

const styles = StyleSheet.create({});
