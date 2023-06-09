import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

export interface ISelectLanguageProps {
  className?: string;
}

interface IOptionLanguageProps {
  value: string;
  label: string;
}

function SelectLanguage({ className }: ISelectLanguageProps) {
  const { t, i18n } = useTranslation();

  const optionLanguage: Array<IOptionLanguageProps> = [
    { value: 'en', label: t('language.en') },
    { value: 'th', label: t('language.th') },
  ];

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      className={className || ''}
      value={i18n.language}
      style={{ width: '100px' }}
      options={optionLanguage}
      onChange={handleChange}
    />
  );
}

export default SelectLanguage;
