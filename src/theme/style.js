import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Default, Fonts } from '@constants/style';
export default StyleSheet.create({
  primaryNav: {
    alignItems: 'center',
    paddingVertical: Default.fixPadding,
    backgroundColor: Colors.primary,
  },
  navBackButton: {
    marginLeft: Default.fixPadding * 1.5,
    marginRight: 5,
  },
  navRightButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Default.fixPadding,
    borderRadius: 8,
    padding: 2,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: Default.fixPadding,
    marginHorizontal: Default.fixPadding * 1.5,
  },
  tableHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Default.fixPadding,
    padding: Default.fixPadding,
    backgroundColor: Colors.lightPrimary,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Default.fixPadding * 0.5,
    backgroundColor: Colors.white,
  },
  tableRowSelected: {
    backgroundColor: '#ffffad',
  },
  tableHeaderText16: Fonts.Primary16Bold,
  tableHeaderText16Medium: { ...Fonts.Primary16Medium, marginLeft: Default.fixPadding * 1.5 },
  tableHeaderText15Medium: { ...Fonts.Primary15Medium, marginLeft: Default.fixPadding * 1.5 },
  divider: {
    height: 1,
    backgroundColor: Colors.bord,
  },
  inputStyle: {
    ...Fonts.Black14Regular,
    height: 35,
    marginVertical: Default.fixPadding * 0.5,
    marginRight: Default.fixPadding * 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.grey,
    padding: 10,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Default.fixPadding,
    marginTop: Default.fixPadding,
    borderRadius: 10,
    ...Default.shadow,
  },
  infoAlert: {
    padding: Default.fixPadding * 0.5,
    backgroundColor: '#e3f2fd',
    borderColor: Colors.info,
    borderWidth: 1,
    borderRadius: 8,
  },
  infoText: {
    ...Fonts.Black14Regular,
    color: Colors.info,
  },
  errorAlert: {
    padding: Default.fixPadding * 0.5,
    backgroundColor: '#fae0e4',
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 8,
  },
  errorText: {
    ...Fonts.Black14Regular,
    color: Colors.red,
  },
});
