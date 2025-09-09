import Text from './Text';
import theme from '../theme';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
  Keyboard,
} from 'react-native';
import { addAlphaChannel } from '../utils/generic';
import { Formik } from 'formik';
import { useEffect, useRef } from 'react';

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
  },
  btnText: { fontSize: 24, fontWeight: 200, alignSelf: 'center' },
  inputLabel: { marginBottom: 8 },
});

const SignIn = () => {
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(shift, {
        toValue: -e.endCoordinates.height / 8,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(shift, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroudCircle}></View>
      <Text style={styles.header}>Sign In</Text>
      <View style={styles.formWrapper}>
        <Animated.View
          style={[styles.formContainer, { transform: [{ translateY: shift }] }]}
        >
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <View>
                {/* Username */}
                <Text fontSize="heading" style={styles.inputLabel}>
                  Username
                </Text>
                <TextInput
                  placeholder="Ex.: lkmss"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  placeholderTextColor={theme.colors.textSecondary}
                  style={styles.inputField}
                />

                {/* Password */}
                <Text fontSize="heading" style={styles.inputLabel}>
                  Password
                </Text>
                <TextInput
                  placeholder="••••••••••••"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholderTextColor={theme.colors.textSecondary}
                  secureTextEntry
                  style={styles.inputField}
                />

                {/* Submit */}
                <Pressable
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  style={styles.submitBtn}
                >
                  <Text style={styles.btnText}>Login</Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </Animated.View>
      </View>
    </View>
  );
};

export default SignIn;
