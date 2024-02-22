import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors, Default, Fonts } from '@constants/style';
import Icon from 'react-native-vector-icons/Ionicons';
const Appoinment = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[{ color: Colors.black, fontSize: 14 }]}>22</Text>
            <Text style={[{ color: Colors.black, fontSize: 12 }]}>Aug</Text>
          </View>
          <View style={{ marginLeft: 15, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={[{ color: Colors.black, fontSize: 14 }]}>Blow Dry</Text>
              <Text style={[{ color: Colors.disable, fontSize: 12 }]}>
                Sat 1:15pm | <Text style={[{ fontSize: 10, color: Colors.disable }]}>COMPLETED</Text>
              </Text>
              <Text style={[{ color: Colors.disable, fontSize: 12 }]}>1 hr 30min with Stella Josh</Text>
            </View>
            <Text style={[{ fontSize: 16, color: Colors.black, marginRight: 15 }]}>$80</Text>
            <Icon name='chevron-forward' size={24} color={Colors.black} />
          </View>
        </View>

        <View style={[Fonts.Divider, { backgroundColor: Colors.bord, marginVertical: 15 }]}></View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[{ color: Colors.black, fontSize: 14 }]}>15</Text>
            <Text style={[{ color: Colors.black, fontSize: 12 }]}>Aug</Text>
          </View>
          <View style={{ marginLeft: 15, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={[{ color: Colors.black, fontSize: 14 }]}>Spa</Text>
              <Text style={[{ color: Colors.disable, fontSize: 12 }]}>
                Sat 2:15pm | <Text style={[{ fontSize: 10, color: Colors.disable }]}>COMPLETED</Text>
              </Text>
              <Text style={[{ color: Colors.disable, fontSize: 12 }]}>1 hr 30min with Stella Josh</Text>
            </View>
            <Text style={[{ fontSize: 16, color: Colors.black, marginRight: 15 }]}>$250</Text>
            <Icon name='chevron-forward' size={24} color={Colors.black} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appoinment;

const styles = StyleSheet.create({});
