import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Default, Fonts } from '@constants/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const ChatScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`chatScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const chatData = [
    {
      id: '1',
      image: require('@assets/images/pro1.png'),
      title: 'Wade Warren',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '2',
      image: require('@assets/images/pro2.png'),
      title: 'Jacob Jones',
      description: tr('nice'),
      isOnline: true,
    },
    {
      id: '3',
      image: require('@assets/images/pro3.png'),
      title: 'Esther Howard',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '4',
      image: require('@assets/images/pro4.png'),
      title: 'Kathryn Murphy',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '5',
      image: require('@assets/images/pro5.png'),
      title: 'Darrell Steward',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '6',
      image: require('@assets/images/pro6.png'),
      title: 'Cody Fisher',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '7',
      image: require('@assets/images/pro7.png'),
      title: 'Darlene Robertson',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '8',
      image: require('@assets/images/pro8.png'),
      title: 'Floyd Miles',
      description: tr('nice'),
      isOnline: true,
    },
    {
      id: '9',
      image: require('@assets/images/pro9.png'),
      title: 'Eleanor Pena',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '10',
      image: require('@assets/images/pro10.png'),
      title: 'Annette Black',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '11',
      image: require('@assets/images/pro11.png'),
      title: 'Dianne Russell',
      description: tr('nice'),
      isOnline: false,
    },
    {
      id: '12',
      image: require('@assets/images/pro12.png'),
      title: 'Leslie Alexander',
      description: tr('nice'),
      isOnline: false,
    },
  ];

  const [search, setSearch] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState(chatData);

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('StoresStack', {
            screen: 'messageScreen',
            params: { title: item.title },
          })
        }
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 1.5,
        }}
      >
        <View
          style={{
            flex: 8.5,
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}
        >
          <Image source={item.image} />
          {item.isOnline ? <View style={styles.isOnlineRound} /> : null}
          <View
            style={{
              marginHorizontal: Default.fixPadding,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                ...Fonts.Black16Medium,
                marginBottom: Default.fixPadding * 0.5,
              }}
            >
              {item.title}
            </Text>
            <Text style={Fonts.Grey14Medium}>{item.description}</Text>
          </View>
        </View>
        <View style={{ flex: 1.5 }}>
          <Text style={Fonts.Grey14Regular}>2.00am</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = chatData.filter(function (item) {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(chatData);
      setSearch(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            paddingVertical: Default.fixPadding,
          }}
        >
          <TouchableOpacity
            style={{ marginHorizontal: Default.fixPadding * 1.5 }}
            onPress={() => props.navigation.navigate('profileScreen')}
          >
            <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
          </TouchableOpacity>
          <Text style={Fonts.White18Bold}>{tr('chat')}</Text>
        </View>

        <View
          style={{
            flexDirection: isRtl ? 'row-reverse' : 'row',
            padding: 8,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.white,
          }}
        >
          <Ionicons
            name='search-outline'
            color={Colors.grey}
            size={20}
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />

          <TextInput
            value={search}
            onChangeText={(text) => searchFilter(text)}
            selectionColor={Colors.primary}
            placeholder={tr('search')}
            placeholderTextColor={Fonts.Grey16Medium}
            style={{
              ...Fonts.Black16Medium,
              flex: 9.5,
              textAlign: isRtl ? 'right' : 'left',
              marginHorizontal: Default.fixPadding,
            }}
          />
        </View>
      </View>
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  isOnlineRound: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '76%',
    left: '13%',
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.ParrotColor,
  },
});
