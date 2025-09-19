import Text from '../Text';
import { View, Pressable, Animated, Keyboard } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import { useEffect, useRef } from 'react';
import CustomTextInput from './TextInput';
import { FormSchema } from './validation';
import useSignIn from '../../hooks/useSignIn';
import AuthStorage from '../../utils/authStorage';
import { useNavigate } from 'react-router-native';

const SignIn = () => {
  const shift = useRef(new Animated.Value(0)).current;
  const [signIn, result] = useSignIn();
  const tokenStorage = new AuthStorage('accessToken');
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
                const data = await signIn(values);
                if (
                  !result.loading &&
                  'data' in result &&
                  typeof data === 'object' &&
                  data !== null &&
                  'authenticate' in data &&
                  typeof data.authenticate === 'object' &&
                  data.authenticate !== null &&
                  'accessToken' in data.authenticate &&
                  typeof data.authenticate.accessToken === 'string'
                ) {
                  await tokenStorage.setAcessToken(
                    data.authenticate.accessToken,
                  );
                  navigate('/');
                }
              } catch (error: unknown) {
                if (
                  error &&
                  typeof error === 'object' &&
                  'name' in error &&
                  'data' in error &&
                  error?.name === 'CombinedGraphQLErrors' &&
                  error.data &&
                  typeof error.data === 'object' &&
                  'authenticate' in error.data &&
                  error?.data?.authenticate === null
                ) {
                  setStatus({ error: 'Invalid username or password' });
                }
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
