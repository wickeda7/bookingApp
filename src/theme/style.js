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
    padding: Default.fixPadding,
    backgroundColor: Colors.white,
    marginLeft: Default.fixPadding * 1.5,
  },
  tableHeaderText16: Fonts.Primary16Bold,
  tableHeaderText16Medium: { ...Fonts.Primary16Medium, marginLeft: Default.fixPadding * 1.5 },
  tableHeaderText15Medium: { ...Fonts.Primary15Medium, marginLeft: Default.fixPadding * 1.5 },
  divider: {
    height: 1,
    backgroundColor: Colors.bord,
  },
});
