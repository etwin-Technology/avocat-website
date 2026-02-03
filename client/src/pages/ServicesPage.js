import React from 'react';
import { 
  Briefcase, Home, Building, FileText, Scale, Users, Car, 
  CheckCircle, Clock, Shield, Sparkles, Star, ArrowRight,
  Phone, Calendar // أضفت الأيقونات الناقصة هنا
} from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesPage = ({ language }) => {
  const services = {
    ar: [
      {
        icon: <Home />,
        title: 'القانون المدني',
        description: 'نقدم الاستشارات القانونية والحلول القضائية في مجال القانون المدني المغربي',
        features: ['تقسيم التركات والميراث', 'قضايا الملكية والعقارات', 'فسخ وتنفيذ العقود', 'قضايا التعويضات'],
        details: 'نمتلك خبرة واسعة في التعامل مع القضايا المدنية المعقدة، مع فريق متخصص في قانون الالتزامات والعقود.'
      },
      {
        icon: <Briefcase />,
        title: 'القانون التجاري',
        description: 'خدمات قانونية متخصصة للشركات والأعمال التجارية',
        features: ['تأسيس الشركات والجمعيات', 'المنازعات التجارية والتحكيم', 'حماية الملكية الفكرية', 'الإفلاس والتسوية'],
        details: 'نساعد الشركات على النمو في بيئة قانونية آمنة مع حماية مصالحها في السوق المغربي والدولي.'
      },
      {
        icon: <Building />,
        title: 'قانون العقار',
        description: 'حلول قانونية شاملة لجميع المعاملات العقارية',
        features: ['توثيق عقود البيع والشراء', 'تسجيل الحقوق العينية', 'النزاعات العقارية', 'الاستثمار العقاري'],
        details: 'نضمن حماية حقوقك العقارية في جميع مراحل المعاملة مع خبرة في التسجيل العقاري المغربي.'
      },
      {
        icon: <FileText />,
        title: 'القانون الإداري',
        description: 'تمثيل أمام المحاكم الإدارية والجهات الحكومية',
        features: ['منازعات الوظيفة العمومية', 'الطعون الإدارية', 'صفقات الدولة والعقود', 'التعويض عن القرارات الإدارية'],
        details: 'ندافع عن حقوق الأفراد والشركات أمام الجهات الإدارية مع فهم عميق للقوانين التنظيمية.'
      },
      {
        icon: <Car />,
        title: 'قانون السير',
        description: 'دفاع متخصص في قضايا حوادث السير',
        features: ['تحرير محاضر الحوادث', 'مطالبات التأمين', 'التعويض عن الأضرار', 'الدفاع عن المتهمين'],
        details: 'نساعدك في الحصول على حقوقك الكاملة بعد الحوادث مع متابعة جميع الإجراءات القانونية.'
      },
      {
        icon: <Users />,
        title: 'قانون الأسرة',
        description: 'حلول قانونية للقضايا الأسرية بسرية تامة',
        features: ['عقود الزواج والطلاق', 'قضايا النفقة والحضانة', 'تسوية المنازعات الأسرية', 'الوصايا والهبات'],
        details: 'نقدم استشارات قانونية متخصصة في مجال الأسرة مع مراعاة الجوانب الإنسانية والقانونية.'
      }
    ],
    fr: [
      {
        icon: <Home />,
        title: 'Droit Civil',
        description: 'Conseils juridiques et solutions judiciaires en droit civil marocain',
        features: ['Partage successoral', 'Litiges immobiliers et propriété', 'Résolution et exécution des contrats', 'Indemnisation'],
        details: 'Nous avons une grande expérience dans le traitement des affaires civiles complexes.'
      },
      {
        icon: <Briefcase />,
        title: 'Droit Commercial',
        description: 'Services juridiques spécialisés pour les entreprises',
        features: ['Création de sociétés et associations', 'Litiges commerciaux et arbitrage', 'Protection de la propriété intellectuelle', 'Faillite et règlement'],
        details: 'Nous aidons les entreprises à croître dans un environnement juridique sécurisé.'
      },
      {
        icon: <Building />,
        title: 'Droit Immobilier',
        description: 'Solutions juridiques complètes pour toutes les transactions immobilières',
        features: ['Authentification des actes de vente', 'Enregistrement des droits réels', 'Litiges immobiliers', 'Investissement immobilier'],
        details: 'Nous protégeons vos droits immobiliers à toutes les étapes de la transaction.'
      },
      {
        icon: <FileText />,
        title: 'Droit Administratif',
        description: 'Représentation devant les tribunaux administratifs et les autorités gouvernementales',
        features: ['Litiges de la fonction publique', 'Recours administratifs', 'Marchés publics et contrats', 'Indemnisation des décisions administratives'],
        details: 'Nous défendons les droits des particuliers et des entreprises devant les autorités administratives.'
      },
      {
        icon: <Car />,
        title: 'Droit Routier',
        description: 'Défense spécialisée en matière d\'accidents de la route',
        features: ['Rédaction des procès-verbaux', 'Réclamations d\'assurance', 'Indemnisation des dommages', 'Défense des accusés'],
        details: 'Nous vous aidons à obtenir vos droits après un accident.'
      },
      {
        icon: <Users />,
        title: 'Droit de la Famille',
        description: 'Solutions juridiques pour les affaires familiales en toute confidentialité',
        features: ['Contrats de mariage et divorce', 'Pension alimentaire et garde d\'enfants', 'Règlement des différends familiaux', 'Testaments et donations'],
        details: 'Nous fournissons des conseils juridiques spécialisés en droit de la famille.'
      }
    ],
    en: [
      {
        icon: <Home />,
        title: 'Civil Law',
        description: 'Legal advice and judicial solutions in Moroccan civil law',
        features: ['Inheritance division', 'Property and real estate disputes', 'Contract termination and execution', 'Compensation claims'],
        details: 'We have extensive experience in handling complex civil cases.'
      },
      {
        icon: <Briefcase />,
        title: 'Commercial Law',
        description: 'Specialized legal services for businesses',
        features: ['Company and association formation', 'Commercial disputes and arbitration', 'Intellectual property protection', 'Bankruptcy and settlement'],
        details: 'We help businesses grow in a secure legal environment.'
      },
      {
        icon: <Building />,
        title: 'Real Estate Law',
        description: 'Comprehensive legal solutions for all real estate transactions',
        features: ['Documentation of sales contracts', 'Registration of property rights', 'Real estate disputes', 'Real estate investment'],
        details: 'We protect your property rights at all stages of the transaction.'
      },
      {
        icon: <FileText />,
        title: 'Administrative Law',
        description: 'Representation before administrative courts and government authorities',
        features: ['Public service disputes', 'Administrative appeals', 'Government contracts', 'Compensation for administrative decisions'],
        details: 'We defend the rights of individuals and companies before administrative authorities.'
      },
      {
        icon: <Car />,
        title: 'Traffic Law',
        description: 'Specialized defense in traffic accident cases',
        features: ['Accident report preparation', 'Insurance claims', 'Damage compensation', 'Defense of accused'],
        details: 'We help you obtain your full rights after accidents.'
      },
      {
        icon: <Users />,
        title: 'Family Law',
        description: 'Legal solutions for family matters with complete confidentiality',
        features: ['Marriage and divorce contracts', 'Alimony and child custody', 'Family dispute settlement', 'Wills and gifts'],
        details: 'We provide specialized legal advice in family law.'
      }
    ]
  };

  const process = {
    ar: [
      { step: 1, title: 'الاستشارة الأولية', description: 'نقوم بتقييم قضيتك وتحديد الاحتياجات' },
      { step: 2, title: 'دراسة الملف', description: 'فحص الوثائق وتحليل الجوانب القانونية' },
      { step: 3, title: 'إستراتيجية الدفاع', description: 'وضع خطة عمل قانونية شاملة' },
      { step: 4, title: 'التنفيذ والمتابعة', description: 'متابعة القضية حتى النهاية' }
    ],
    fr: [
      { step: 1, title: 'Consultation Initiale', description: 'Évaluation de votre cas et identification des besoins' },
      { step: 2, title: 'Étude du Dossier', description: 'Examen des documents et analyse des aspects juridiques' },
      { step: 3, title: 'Stratégie de Défense', description: 'Élaboration d\'un plan d\'action juridique complet' },
      { step: 4, title: 'Exécution et Suivi', description: 'Suivi de l\'affaire jusqu\'à la fin' }
    ],
    en: [
      { step: 1, title: 'Initial Consultation', description: 'Assessment of your case and identification of needs' },
      { step: 2, title: 'Case Study', description: 'Document review and legal analysis' },
      { step: 3, title: 'Defense Strategy', description: 'Development of a comprehensive legal action plan' },
      { step: 4, title: 'Execution and Follow-up', description: 'Case follow-up until conclusion' }
    ]
  };

  const currentServices = services[language];
  const currentProcess = process[language];
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #c9a33e 2px, transparent 0%)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Floating shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-900/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-yellow-200/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 rounded-full px-6 py-3 mb-8">
              <div className="relative">
                <Scale className="w-5 h-5 text-yellow-700" />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-yellow-800 tracking-wide">
                {language === 'ar' ? 'خدماتنا المتخصصة' : language === 'fr' ? 'Nos Services Spécialisés' : 'Our Specialized Services'}
              </span>
              <Star className="w-4 h-4 text-yellow-600" />
            </div>

            {/* Title & Description */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-yellow-600 to-gray-900 bg-clip-text text-transparent">
                  {language === 'ar' ? 'خدماتنا القانونية' : language === 'fr' ? 'Nos Services Juridiques' : 'Our Legal Services'}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {language === 'ar' 
                  ? 'حلول قانونية متكاملة تلبي جميع احتياجاتك في مختلف المجالات القانونية'
                  : language === 'fr' 
                    ? 'Solutions juridiques intégrées répondant à tous vos besoins dans divers domaines juridiques'
                    : 'Integrated legal solutions that meet all your needs in various legal fields'}
              </p>
              
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {language === 'ar' 
                  ? 'نقدم مجموعة شاملة من الخدمات القانونية المحترفة لتلبية جميع احتياجاتك في جميع المجالات القانونية'
                  : language === 'fr' 
                    ? 'Nous offrons une gamme complète de services juridiques professionnels pour répondre à tous vos besoins dans tous les domaines du droit'
                    : 'We provide a comprehensive range of professional legal services to meet all your needs in all areas of law'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:border-yellow-400 group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {language === 'ar' ? 'المميزات:' : language === 'fr' ? 'Caractéristiques:' : 'Features:'}
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle size={18} className="text-yellow-600 mr-2" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                  >
                    <span>{language === 'ar' ? 'طلب خدمة' : language === 'fr' ? 'Demander ce Service' : 'Request Service'}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'مسار العمل القانوني' : language === 'fr' ? 'Processus Juridique' : 'Legal Process'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'نعمل وفق منهجية دقيقة لضمان أفضل النتائج لعملائنا' 
                : language === 'fr' 
                  ? 'Nous travaillons selon une méthodologie précise pour garantir les meilleurs résultats à nos clients'
                  : 'We work with a precise methodology to ensure the best results for our clients'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 hover:border-yellow-200">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${index % 2 === 0 ? 'from-yellow-500 to-yellow-600' : 'from-blue-700 to-blue-800'} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
                    {item.step}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {index < currentProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a33e 2px, transparent 0%)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {language === 'ar' ? 'هل تحتاج إلى مساعدة قانونية؟' : language === 'fr' ? 'Besoin d\'Aide Juridique ?' : 'Need Legal Help?'}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {language === 'ar' 
                  ? 'اتصل بنا اليوم للحصول على استشارة مجانية مع محامينا المتخصصين' 
                  : language === 'fr' 
                    ? 'Contactez-nous aujourd\'hui pour une consultation gratuite avec nos avocats spécialisés'
                    : 'Contact us today for a free consultation with our specialized lawyers'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  <span>{language === 'ar' ? 'اتصل بنا الآن' : language === 'fr' ? 'Contactez-nous Maintenant' : 'Contact Us Now'}</span>
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 font-bold px-8 py-4 rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{language === 'ar' ? 'احجز استشارة مجانية' : language === 'fr' ? 'Réservez une Consultation Gratuite' : 'Book Free Consultation'}</span>
                </motion.button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-yellow-600" />
                    <span className="leading-relaxed">{language === 'ar' ? 'سرية تامة' : language === 'fr' ? 'Confidentialité totale' : 'Total confidentiality'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                    <span className="leading-relaxed">{language === 'ar' ? 'خبراء معتمدون' : language === 'fr' ? 'Experts certifiés' : 'Certified experts'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="leading-relaxed">{language === 'ar' ? 'رد سريع' : language === 'fr' ? 'Réponse rapide' : 'Fast response'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;