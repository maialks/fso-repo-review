import Text from '../Text';
import { View, Pressable, Animated, Keyboard } from 'react-native';
import styles from './styles';
import { Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import CustomTextInput from './TextInput';
import { FormSchema } from './validation';

const SignIn = () => {
  const shift = useRef(new Animated.Value(0)).current;

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
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
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
              touched,
              handleBlur,
            }) => (
              <View>
                {/* Username */}
                <CustomTextInput
                  title="Username"
                  placeholder="Ex.: lkmss"
                  value={values.username}
                  handleChange={handleChange('username')}
                  error={errors.username}
                  handleBlur={handleBlur('username')}
                  touched={touched.username}
                />

                {/* Password */}
                <CustomTextInput
                  title="Password"
                  placeholder="••••••••••••"
                  value={values.password}
                  handleChange={handleChange('password')}
                  secure={true}
                  error={errors.password}
                  handleBlur={handleBlur('password')}
                  touched={touched.password}
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
