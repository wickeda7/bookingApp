import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Default, Fonts, Colors } from '@constants/style';
import Style from '@theme/style';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { addSplitService } from '@redux/actions/adminHomeAction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const StaffServiceBtn = ({
  add,
  setAdd,
  setAddedItem,
  addedItem,
  handleCancel,
  canceled,
  setService,
  handleAddRow,
  item,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const dispatch = useDispatch();
  if (add) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (canceled) return;
            setAdd(!add);
            setAddedItem(null);
            dispatch(addSplitService({ service: addedItem, type: 'splitService' }));
          }}
          style={[
            Style.buttonStyle,
            Style.borderGreen,
            {
              paddingVertical: 2,
              marginTop: 0,
              flexDirection: 'row',
              width: 100,
              height: 30,
              marginRight: 20,
            },
          ]}
        >
          <AntIcon size={18} name='check' color='green' />
          <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: 'green' }]}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (canceled) return;
            handleCancel();
          }}
          style={[
            Style.buttonStyle,
            Style.borderRed,
            {
              paddingVertical: 2,
              marginTop: 0,
              flexDirection: 'row',
              width: 80,
              height: 30,
              marginRight: 10,
            },
          ]}
        >
          <AntIcon size={18} name='close' color={Colors.red} />
          <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.red }]}>Cancel</Text>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (canceled) return;
          setService(item, 'remove');
        }}
        style={[
          Style.buttonStyle,
          Style.borderRed,
          {
            paddingVertical: 2,
            marginTop: 0,
            flexDirection: 'row',
            width: 100,
            height: 30,
            marginRight: 20,
          },
        ]}
      >
        <AntIcon size={18} name='deleteuser' color={Colors.red} />
        <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.red }]}>{tr('removestaff')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (canceled) return;
          handleAddRow();
        }}
        style={[
          Style.buttonStyle,
          Style.borderInfo,
          {
            paddingVertical: 2,
            marginTop: 0,
            flexDirection: 'row',
            width: 80,
            height: 30,
            marginRight: 10,
          },
        ]}
      >
        <AntIcon size={18} name='adduser' color={Colors.info} />
        <Text style={[{ paddingHorizontal: Default.fixPadding * 0.5, color: Colors.info }]}>{tr('add')}</Text>
      </TouchableOpacity>
    </>
  );
};

export default StaffServiceBtn;

const styles = StyleSheet.create({});
