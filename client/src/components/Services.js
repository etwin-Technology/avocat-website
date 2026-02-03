import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Home, 
  Building, 
  FileText, 
  Scale, 
  Users, 
  Car, 
  Globe,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Award,
  Sparkles,
  Zap,
  Target,
  Heart,
  Landmark,
  Key,
  BookOpen,
  MessageSquare,
  Calendar,
  Star,
  ChevronLeft,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = ({ language }) => {
  const [activeService, setActiveService] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const services = {
    ar: [
      {
        icon: <Scale />,
        title: 'القانون المدني',
        description: 'قضايا الميراث، الملكية، العقود، والالتزامات القانونية',
        features: ['تقسيم التركات والميراث', 'قضايا الملكية والعقارات', 'فسخ وتنفيذ العقود', 'قضايا التعويضات والمسؤولية'],
        details: 'نقدم الاستشارات القانونية والتمثيل القضائي في جميع القضايا المدنية مع ضمان الحصول على حقوقك كاملة.',
        stats: { cases: '200+', success: '95%', years: '15+' },
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: <Briefcase />,
        title: 'القانون التجاري',
        description: 'تأسيس الشركات، المنازعات التجارية، الملكية الفكرية',
        features: ['تأسيس الشركات والجمعيات', 'المنازعات التجارية والتحكيم', 'حماية الملكية الفكرية', 'الإفلاس والتسوية'],
        details: 'نساعد الشركات على النمو في بيئة قانونية آمنة مع حماية مصالحها في السوق المغربي والدولي.',
        stats: { cases: '150+', success: '92%', years: '12+' },
        color: 'from-purple-500 to-pink-500'
      },
      {
        icon: <Building />,
        title: 'قانون العقار',
        description: 'معاملات بيع وشراء العقارات، التسجيل العقاري، النزاعات',
        features: ['توثيق عقود البيع والشراء', 'تسجيل الحقوق العينية', 'النزاعات العقارية', 'الاستثمار العقاري'],
        details: 'نضمن حماية حقوقك العقارية في جميع مراحل المعاملة مع خبرة في التسجيل العقاري المغربي.',
        stats: { cases: '300+', success: '97%', years: '18+' },
        color: 'from-green-500 to-emerald-500'
      },
      {
        icon: <Landmark />,
        title: 'القانون الإداري',
        description: 'منازعات الوظيفة العمومية، صفقات الدولة، الطعون الإدارية',
        features: ['منازعات الوظيفة العمومية', 'الطعون الإدارية', 'صفقات الدولة والعقود', 'التعويض عن القرارات الإدارية'],
        details: 'ندافع عن حقوق الأفراد والشركات أمام الجهات الإدارية مع فهم عميق للقوانين التنظيمية.',
        stats: { cases: '120+', success: '90%', years: '10+' },
        color: 'from-orange-500 to-red-500'
      },
      {
        icon: <Car />,
        title: 'قانون السير',
        description: 'قضايا حوادث السير والتعويضات، الدفاع عن المتهمين',
        features: ['تحرير محاضر الحوادث', 'مطالبات التأمين', 'التعويض عن الأضرار', 'الدفاع عن المتهمين'],
        details: 'نساعدك في الحصول على حقوقك الكاملة بعد الحوادث مع متابعة جميع الإجراءات القانونية.',
        stats: { cases: '250+', success: '94%', years: '14+' },
        color: 'from-yellow-500 to-amber-500'
      },
      {
        icon: <Heart />,
        title: 'قانون الأسرة',
        description: 'الزواج، الطلاق، النفقة، الحضانة، الميراث',
        features: ['عقود الزواج والطلاق', 'قضايا النفقة والحضانة', 'تسوية المنازعات الأسرية', 'الوصايا والهبات'],
        details: 'نقدم استشارات قانونية متخصصة في مجال الأسرة مع مراعاة الجوانب الإنسانية والقانونية.',
        stats: { cases: '180+', success: '96%', years: '16+' },
        color: 'from-pink-500 to-rose-500'
      }
    ],
    fr: [
      {
        icon: <Scale />,
        title: 'Droit Civil',
        description: 'Successions, propriété, contrats et obligations légales',
        features: ['Partage successoral et héritage', 'Litiges de propriété et immobiliers', 'Résolution et exécution de contrats', 'Compensations et responsabilité'],
        details: 'Nous fournissons des conseils juridiques et une représentation judiciaire dans toutes les affaires civiles.',
        stats: { cases: '200+', success: '95%', years: '15+' },
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: <Briefcase />,
        title: 'Droit Commercial',
        description: 'Création d\'entreprises, litiges commerciaux, propriété intellectuelle',
        features: ['Création de sociétés et associations', 'Litiges commerciaux et arbitrage', 'Protection de la propriété intellectuelle', 'Faillite et règlement'],
        details: 'Nous aidons les entreprises à croître dans un environnement juridique sécurisé.',
        stats: { cases: '150+', success: '92%', years: '12+' },
        color: 'from-purple-500 to-pink-500'
      },
      {
        icon: <Building />,
        title: 'Droit Immobilier',
        description: 'Transactions immobilières, enregistrement foncier, litiges',
        features: ['Authentification d\'actes de vente', 'Enregistrement des droits réels', 'Litiges immobiliers', 'Investissement immobilier'],
        details: 'Nous protégeons vos droits immobiliers à toutes les étapes de la transaction.',
        stats: { cases: '300+', success: '97%', years: '18+' },
        color: 'from-green-500 to-emerald-500'
      },
      {
        icon: <Landmark />,
        title: 'Droit Administratif',
        description: 'Litiges de la fonction publique, marchés publics, recours administratifs',
        features: ['Litiges de la fonction publique', 'Recours administratifs', 'Marchés publics et contrats', 'Indemnisation des décisions administratives'],
        details: 'Nous défendons les droits des particuliers et des entreprises devant les autorités administratives.',
        stats: { cases: '120+', success: '90%', years: '10+' },
        color: 'from-orange-500 to-red-500'
      },
      {
        icon: <Car />,
        title: 'Droit Routier',
        description: 'Accidents de la route, indemnisation, défense des accusés',
        features: ['Rédaction de procès-verbaux', 'Réclamations d\'assurance', 'Indemnisation des dommages', 'Défense des accusés'],
        details: 'Nous vous aidons à obtenir vos droits complets après des accidents.',
        stats: { cases: '250+', success: '94%', years: '14+' },
        color: 'from-yellow-500 to-amber-500'
      },
      {
        icon: <Heart />,
        title: 'Droit de la Famille',
        description: 'Mariage, divorce, pension alimentaire, garde d\'enfants, héritage',
        features: ['Contrats de mariage et divorce', 'Litiges de pension et garde', 'Règlement des différends familiaux', 'Testaments et donations'],
        details: 'Nous fournissons des conseils juridiques spécialisés en droit de la famille.',
        stats: { cases: '180+', success: '96%', years: '16+' },
        color: 'from-pink-500 to-rose-500'
      }
    ],
    en: [
      {
        icon: <Scale />,
        title: 'Civil Law',
        description: 'Inheritance, property, contracts and legal obligations',
        features: ['Estate division and inheritance', 'Property and real estate disputes', 'Contract termination and execution', 'Compensation and liability'],
        details: 'We provide legal advice and judicial representation in all civil cases.',
        stats: { cases: '200+', success: '95%', years: '15+' },
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: <Briefcase />,
        title: 'Commercial Law',
        description: 'Company formation, commercial disputes, intellectual property',
        features: ['Company and association formation', 'Commercial disputes and arbitration', 'Intellectual property protection', 'Bankruptcy and settlement'],
        details: 'We help businesses grow in a secure legal environment.',
        stats: { cases: '150+', success: '92%', years: '12+' },
        color: 'from-purple-500 to-pink-500'
      },
      {
        icon: <Building />,
        title: 'Real Estate Law',
        description: 'Property transactions, land registration, disputes',
        features: ['Documentation of sales contracts', 'Registration of property rights', 'Real estate disputes', 'Real estate investment'],
        details: 'We protect your property rights at all stages of the transaction.',
        stats: { cases: '300+', success: '97%', years: '18+' },
        color: 'from-green-500 to-emerald-500'
      },
      {
        icon: <Landmark />,
        title: 'Administrative Law',
        description: 'Public service disputes, government contracts, administrative appeals',
        features: ['Public service disputes', 'Administrative appeals', 'Government contracts', 'Compensation for administrative decisions'],
        details: 'We defend the rights of individuals and companies before administrative authorities.',
        stats: { cases: '120+', success: '90%', years: '10+' },
        color: 'from-orange-500 to-red-500'
      },
      {
        icon: <Car />,
        title: 'Traffic Law',
        description: 'Road accidents, compensation, defense of accused',
        features: ['Accident report preparation', 'Insurance claims', 'Damage compensation', 'Defense of accused'],
        details: 'We help you obtain your full rights after accidents.',
        stats: { cases: '250+', success: '94%', years: '14+' },
        color: 'from-yellow-500 to-amber-500'
      },
      {
        icon: <Heart />,
        title: 'Family Law',
        description: 'Marriage, divorce, alimony, child custody, inheritance',
        features: ['Marriage and divorce contracts', 'Alimony and custody disputes', 'Family dispute settlement', 'Wills and gifts'],
        details: 'We provide specialized legal advice in family law.',
        stats: { cases: '180+', success: '96%', years: '16+' },
        color: 'from-pink-500 to-rose-500'
      }
    ]
  };

  const currentServices = services[language];
  const isRTL = language === 'ar';

  const ServiceCard = ({ service, index }) => (
    <div 
      className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
        activeService === index ? 'ring-2 ring-[#c9a33e] scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setActiveService(index)}
      onMouseLeave={() => setActiveService(null)}
    >
      {/* Card Header with Gradient */}
      <div className={`relative h-2 bg-gradient-to-r ${service.color}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
      
      <div className="p-6 md:p-8">
        {/* Icon & Title */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {React.cloneElement(service.icon, { size: 24 })}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {service.title}
            </h3>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          {service.description}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{service.stats.cases}</div>
            <div className="text-xs text-gray-500">{language === 'ar' ? 'قضية' : language === 'fr' ? 'Cas' : 'Cases'}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{service.stats.success}</div>
            <div className="text-xs text-gray-500">{language === 'ar' ? 'نجاح' : language === 'fr' ? 'Succès' : 'Success'}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{service.stats.years}</div>
            <div className="text-xs text-gray-500">{language === 'ar' ? 'سنة خبرة' : language === 'fr' ? 'Ans Exp' : 'Years Exp'}</div>
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Zap size={16} className="text-[#c9a33e]" />
            <span>{language === 'ar' ? 'المميزات:' : language === 'fr' ? 'Caractéristiques:' : 'Features:'}</span>
          </div>
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveService(activeService === index ? null : index)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all group/btn"
          >
            <span className="text-sm font-medium">
              {language === 'ar' ? 'تفاصيل أكثر' : language === 'fr' ? 'Plus de détails' : 'More Details'}
            </span>
            <ChevronDown size={16} className={`transition-transform ${activeService === index ? 'rotate-180' : ''}`} />
          </button>
          
          <Link
            to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a365d] to-[#2d4a8a] text-white rounded-lg hover:shadow-lg transition-all group/link"
          >
            <ArrowRight size={16} className={`${isRTL ? 'rotate-180' : ''} group-hover/link:translate-x-1 transition-transform`} />
          </Link>
        </div>
      </div>
      
      {/* Expandable Details */}
      {activeService === index && (
        <div className="px-6 md:px-8 pb-6 md:pb-8 animate-slideDown">
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-700 mb-4">{service.details}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Shield size={20} className="text-blue-600" />
                <div>
                  <div className="text-sm font-semibold text-blue-900">
                    {language === 'ar' ? 'حماية قانونية' : language === 'fr' ? 'Protection Juridique' : 'Legal Protection'}
                  </div>
                  <div className="text-xs text-blue-700">
                    {language === 'ar' ? 'ضمان كامل للحقوق' : language === 'fr' ? 'Garantie complète des droits' : 'Full rights guarantee'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Clock size={20} className="text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-green-900">
                    {language === 'ar' ? 'متابعة مستمرة' : language === 'fr' ? 'Suivi Continu' : 'Continuous Follow-up'}
                  </div>
                  <div className="text-xs text-green-700">
                    {language === 'ar' ? 'تحديثات منتظمة' : language === 'fr' ? 'Mises à jour régulières' : 'Regular updates'}
                  </div>
                </div>
              </div>
            </div>
            
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 font-bold rounded-lg hover:shadow-xl transition-all"
            >
              <MessageSquare size={18} />
              <span>{language === 'ar' ? 'طلب استشارة' : language === 'fr' ? 'Demander Consultation' : 'Request Consultation'}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="services-section" className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 ${isVisible ? 'animate-fadeIn' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a365d]/10 rounded-full mb-4">
            <Sparkles size={16} className="text-[#c9a33e]" />
            <span className="text-sm font-semibold text-[#1a365d]">
              {language === 'ar' ? 'خدماتنا المتخصصة' : language === 'fr' ? 'Nos Services Spécialisés' : 'Our Specialized Services'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-[#1a365d] to-[#2d4a8a] bg-clip-text text-transparent">
              {language === 'ar' ? 'خدماتنا القانونية' : language === 'fr' ? 'Nos Services Juridiques' : 'Our Legal Services'}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'نقدم مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتك في مختلف المجالات القانونية بالمغرب'
              : language === 'fr'
                ? 'Nous offrons une gamme complète de services juridiques spécialisés pour répondre à tous vos besoins dans divers domaines du droit marocain'
                : 'We provide a comprehensive range of specialized legal services to meet all your needs in various areas of Moroccan law'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {currentServices.map((service, index) => (
            <div 
              key={index} 
              className={`transition-all duration-500 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* Consultation Banner */}
        <div className={`relative overflow-hidden bg-gradient-to-r from-[#1a365d] via-[#2d4a8a] to-[#1a365d] rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-white ${isVisible ? 'animate-fadeIn' : ''}`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#c9a33e] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {language === 'ar' ? 'استشارة قانونية مجانية' : language === 'fr' ? 'Consultation Juridique Gratuite' : 'Free Legal Consultation'}
                  </h3>
                </div>
                
                <p className="text-gray-200 text-lg mb-6 max-w-2xl">
                  {language === 'ar'
                    ? 'احصل على استشارة أولية مجانية مع محامينا المتخصصين. ندرس قضيتك ونقدم لك الحلول القانونية المناسبة.'
                    : language === 'fr'
                    ? 'Obtenez une consultation initiale gratuite avec nos avocats spécialisés. Nous étudions votre cas et vous proposons les solutions juridiques appropriées.'
                    : 'Get a free initial consultation with our specialized lawyers. We study your case and provide you with appropriate legal solutions.'}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#c9a33e]" />
                    <span>{language === 'ar' ? 'تحليل مجاني للقضية' : language === 'fr' ? 'Analyse gratuite du cas' : 'Free case analysis'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#c9a33e]" />
                    <span>{language === 'ar' ? 'خطة عمل قانونية' : language === 'fr' ? 'Plan d\'action juridique' : 'Legal action plan'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#c9a33e]" />
                    <span>{language === 'ar' ? 'تحديد التكلفة مسبقاً' : language === 'fr' ? 'Coût déterminé à l\'avance' : 'Cost determined in advance'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Link
                  to="/appointment"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c9a33e] to-[#d4b357] text-gray-900 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span className="text-lg">
                    {language === 'ar' ? 'احجز استشارة مجانية' : language === 'fr' ? 'Réserver Consultation Gratuite' : 'Book Free Consultation'}
                  </span>
                  <ArrowRight size={20} className={`${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                </Link>
                
                <div className="mt-4 text-center text-gray-300 text-sm">
                  {language === 'ar' ? 'أو اتصل بنا مباشرة: +212 6 XX XX XX XX' : 
                   language === 'fr' ? 'Ou appelez-nous directement: +212 6 XX XX XX XX' : 
                   'Or call us directly: +212 6 XX XX XX XX'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { number: '500+', label: { ar: 'قضية ناجحة', fr: 'Cas Réussis', en: 'Successful Cases' }, icon: <Award /> },
            { number: '15+', label: { ar: 'سنة خبرة', fr: 'Ans d\'Expérience', en: 'Years Experience' }, icon: <Target /> },
            { number: '98%', label: { ar: 'رضا العملاء', fr: 'Satisfaction Client', en: 'Client Satisfaction' }, icon: <Star /> },
            { number: '50+', label: { ar: 'عميل دائم', fr: 'Clients Fidèles', en: 'Loyal Clients' }, icon: <Users /> }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <div className="inline-flex p-3 bg-gradient-to-br from-[#1a365d] to-[#2d4a8a] rounded-lg text-white mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label[language]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        @media (max-width: 480px) {
          .grid-cols-2 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default Services;