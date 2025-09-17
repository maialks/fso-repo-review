import { StyleSheet } from 'react-native';
import { addAlphaChannel } from '../../utils/generic';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  backgroudCircle: {
    position: 'absolute',
    top: -500,
    left: -250,
    width: 999,
    height: 799,
    borderRadius: 450,
    backgroundColor: theme.colors.appBar,
    zIndex: -1,
  },
  header: { fontSize: 60, flex: 1, marginTop: 40 },
  formWrapper: { flex: 4, justifyContent: 'flex-start', marginBottom: 80 },
  formContainer: {
    backgroundColor: addAlphaChannel('#000000', 50),
    width: 350,
    borderRadius: 20,
    padding: 40,
  },
  inputField: {
    borderWidth: 1,
    borderColor: addAlphaChannel(theme.colors.textSecondary, 50),
    color: theme.colors.textPrimary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  submitBtn: {
    borderWidth: 1,
    backgroundColor: addAlphaChannel(theme.colors.appBar, 70),
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  btnText: { fontSize: 24, fontWeight: 200, alignSelf: 'center' },
  inputLabel: { marginBottom: 8 },
  errorMsg: { color: theme.colors.error, marginBottom: 2 },
});

export default styles;
