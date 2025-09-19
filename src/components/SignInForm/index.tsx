import Text from '../Text';
import { View, Pressable, Animated, Keyboard } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import { useEffect, useRef } from 'react';
import CustomTextInput from './TextInput';
import { FormSchema } from './validation';
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

import AuthStorage from '../../utils/authStorage';
import { isGraphQLErrorWithAuth } from '../../utils/typeGuards';
const tokenStorage = new AuthStorage('accessToken');

const SignIn = () => {
  const shift = useRef(new Animated.Value(0)).current;
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  // Keyboard Spacing Animation
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
            initialValues={{ username: 'kalle', password: 'password' }}
            onSubmit={async (
              values,
              { setSubmitting, setStatus, setTouched },
            ) => {
              try {
                await signIn(values);
                navigate('/');
              } catch (error: unknown) {
                if (isGraphQLErrorWithAuth(error))
                  setStatus({ error: 'Invalid username or password' });
                console.log(error);
              }
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={FormSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              isSubmitting,
              errors,
              status,
              touched,
              handleBlur,
              setStatus,
            }) => (
              <View>
                {/* Username */}
                <CustomTextInput
                  title="Username"
                  placeholder="Ex.: lkmss"
                  value={values.username}
                  handleChange={(text) => {
                    setStatus(null);
                    handleChange('username')(text);
                  }}
                  handleBlur={handleBlur('username')}
                  touched={touched.username}
                  error={errors.username}
                />

                {/* Password */}
                <CustomTextInput
                  title="Password"
                  placeholder="••••••••••••"
                  value={values.password}
                  handleChange={(text) => {
                    setStatus(null);
                    handleChange('password')(text);
                  }}
                  handleBlur={handleBlur('password')}
                  touched={touched.password}
                  error={errors.password}
                  secure={true}
                />

                {/* Wrong Credentials Error Message */}
                {status && 'error' in status && (
                  <Text style={styles.errorMsg}>{status.error}</Text>
                )}

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
