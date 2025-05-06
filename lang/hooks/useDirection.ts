// hooks/useDirection.ts
import { useTranslation } from 'react-i18next';
import { ViewStyle } from 'react-native';

interface DirectionStyles {
  isRTL: boolean;
  direction: 'rtl' | 'ltr';
  textAlign: 'right' | 'left';
  flexDirection: 'row' | 'row-reverse';
  paddingHorizontal: ViewStyle;
}

export const useDirection = (): DirectionStyles => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    flexDirection: isRTL ? 'row-reverse' : 'row',
    paddingHorizontal: isRTL ? { paddingRight: 20, paddingLeft: 10 } : { paddingLeft: 20, paddingRight: 10 },
  };
};
