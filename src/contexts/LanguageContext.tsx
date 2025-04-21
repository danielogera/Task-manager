import React, { createContext, useContext, useState, useEffect } from 'react';

interface TranslationKeys {
  dashboard: string;
  calendar: string;
  analytics: string;
  settings: string;
  totalTasks: string;
  completedTasks: string;
  inProgress: string;
  overdueTasks: string;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: keyof TranslationKeys) => string;
}

const translations: Record<string, TranslationKeys> = {
  en: {
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    analytics: 'Analytics',
    settings: 'Settings',
    totalTasks: 'Total Tasks',
    completedTasks: 'Completed Tasks',
    inProgress: 'In Progress',
    overdueTasks: 'Overdue Tasks',
  },
  es: {
    dashboard: 'Panel de Control',
    calendar: 'Calendario',
    analytics: 'Análisis',
    settings: 'Configuración',
    totalTasks: 'Tareas Totales',
    completedTasks: 'Tareas Completadas',
    inProgress: 'En Progreso',
    overdueTasks: 'Tareas Atrasadas',
  },
  fr: {
    dashboard: 'Tableau de Bord',
    calendar: 'Calendrier',
    analytics: 'Analytique',
    settings: 'Paramètres',
    totalTasks: 'Tâches Totales',
    completedTasks: 'Tâches Terminées',
    inProgress: 'En Cours',
    overdueTasks: 'Tâches En Retard',
  },
  // Add more languages as needed
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  const t = (key: keyof TranslationKeys) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 