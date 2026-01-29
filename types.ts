
import React from 'react';

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  price: string;
  maintenance: string;
  icon: React.ReactNode;
  isPopular?: boolean;
  isExtra?: boolean;
}

export enum ChatStep {
  WELCOME = 'WELCOME',
  CHOOSING_SERVICE = 'CHOOSING_SERVICE',
  ENTERING_NAME = 'ENTERING_NAME',
  PACKAGE_DETAILS = 'PACKAGE_DETAILS',
  SUMMARY = 'SUMMARY',
  REDIRECTING = 'REDIRECTING'
}
