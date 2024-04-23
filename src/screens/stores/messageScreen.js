import { Text, View, TouchableOpacity, BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, Default, Fonts } from '@constants/style';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '@components/myStatusBar';

const MessageScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key) {
    return t(`messageScreen:${key}`);
  }

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Lorem ipsum dolor sit amen, \n consectetur advising elite. ',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'person1',
        },
      },
      {
        _id: 2,
        text: 'Lorem ipsum dolor sit amen, \n consectetur advising Eliot. ',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'person2',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 40,
            borderWidth: 2,
            borderColor: Colors.primary,
            marginRight: Default.fixPadding,
            borderRadius: 20,
            backgroundColor: Colors.white,
          }}
        >
          <Ionicons name='send' size={20} color={Colors.primary} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            ...Default.shadow,
            backgroundColor: Colors.primary,
          },
          left: {
            ...Default.shadow,
            backgroundColor: Colors.white,
          },
        }}
        textStyle={{
          right: {
            color: Colors.white,
          },
          left: {
            color: Colors.black,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name='angle-double-down' size={22} color={Colors.grey} />;
  };

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
        <View
          style={{
            flex: 9,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ marginHorizontal: Default.fixPadding * 1.5 }}
            onPress={() => props.navigation.pop()}
          >
            <Ionicons name={isRtl ? 'arrow-forward' : 'arrow-back'} size={30} color={Colors.white} />
          </TouchableOpacity>
          <Text style={Fonts.White18Bold}>Wade warren</Text>
        </View>
        <TouchableOpacity style={{ flex: 1, marginHorizontal: 10 }}>
          <Ionicons name='call-outline' size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <GiftedChat
          placeholder={tr('typeHere')}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              scrollToBottomComponent
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                backgroundColor: Colors.white,
              }}
            />
          )}
        />
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior='position' />}
      </View>
    </View>
  );
};

export default MessageScreen;
