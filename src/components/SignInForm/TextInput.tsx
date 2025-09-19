import { View, TextInput, type BlurEvent } from 'react-native';
import React from 'react';
import styles from './styles';
import theme from '../../theme';
import Text from '../Text';

type TextInputProps = {
  title: string;
  placeholder: string;
  value: string;
  handleChange: (text: string) => void;
  handleBlur: (e: BlurEvent) => void;
  secure?: boolean;
  error: string | undefined;
  touched: boolean | undefined;
};

const CustomTextInput = (props: TextInputProps) => {
  return (
    <View>
      <Text fontSize="heading" style={styles.inputLabel}>
        {props.title}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.handleChange}
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.inputField}
        secureTextEntry={!!props.secure}
        onBlur={props.handleBlur}
      />
      {props.touched && props.error && (
        <Text style={styles.errorMsg}>{props.error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;
