import React from 'react';
import { Button } from 'react-native-elements';

import { reusableButtonStyles } from '@/globalStyles';
interface ReusableButtonProps {
  title: string;
  onPress: () => void;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      type="clear"
      onPress={onPress}
      titleStyle={reusableButtonStyles.actionButton}
    />
  );
};


export default ReusableButton;
