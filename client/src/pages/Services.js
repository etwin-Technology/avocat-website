// recall compentent for servicespage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, Home, Building, FileText, Scale, Users, Car, 
  CheckCircle, Clock, Shield, Sparkles, Star, ArrowRight,
  Phone, Calendar // أضفت الأيقونات الناقصة هنا
} from 'lucide-react';
import servicesData from '../data/servicesData';

const Services = ({ language }) => {
  return (
    <div className="services-container">
      {servicesData.map((service, index) => (
        <motion.div
          key={index}
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="service-icon">
            {React.createElement(service.icon, { size: 48, color: '#4A90E2' })}
          </div>
          <h3 className="service-title">
            {service.title[language]}
          </h3>
          <p className="service-description">
            {service.description[language]}
          </p>
          <Link to={service.link} className="service-link">
            {service.linkText[language]} <ArrowRight size={16} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Services;