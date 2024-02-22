import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors, Default, Fonts } from '@constants/style';
import Icon from 'react-native-vector-icons/Ionicons';
const InVoice = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>#</Text>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>22</Text>
          </View>
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>Sat, 22 Aug 2020</Text>
            <Text style={[{ fontSize: 10, color: '#02A81B' }]}>COMPLETED</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[{ fontSize: 16, color: Colors.black, marginRight: 15 }]}>$80</Text>
            <Icon name='chevron-forward' size={24} color={Colors.black} />
          </View>
        </View>

        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>#</Text>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>18</Text>
          </View>
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={[, { fontSize: 12, color: Colors.disable }]}>Wed, 18 Aug 2020</Text>
            <Text style={[{ fontSize: 10, color: '#02A81B' }]}>COMPLETED</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[{ fontSize: 16, color: Colors.black, marginRight: 15 }]}>$120</Text>
            <Icon name='chevron-forward' size={24} color={Colors.black} />
          </View>
        </View>

        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>#</Text>
            <Text style={[{ fontSize: 14, color: Colors.black }]}>18</Text>
          </View>
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={[{ fontSize: 12, color: Colors.disable }]}>Wed, 18 Aug 2020</Text>
            <Text style={[{ fontSize: 10, color: '#02A81B' }]}>COMPLETED</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[{ fontSize: 16, color: Colors.black, marginRight: 15 }]}>$120</Text>
            <Icon name='chevron-forward' size={24} color={Colors.black} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InVoice;
