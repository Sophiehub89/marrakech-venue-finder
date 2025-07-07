
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-red-800 to-orange-700 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-2">{t('footer.title')}</h3>
        <p className="text-orange-100">{t('footer.subtitle')}</p>
      </div>
    </footer>
  );
};

export default Footer;
