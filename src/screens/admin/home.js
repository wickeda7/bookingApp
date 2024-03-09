import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import NotificationsHelper from '@utils/notifications';
const AdminHome = () => {
  return (
    <View>
      <NotificationsHelper />
      <Text>Home</Text>
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({});
