/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { logoSaigonEyeHospital } from '../assets/images';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Mắt Sài Gòn logo using the SINGLE official image file
 */
export function LogoIcon({ className = '', size }: LogoProps) {
  const dimensions = size ? {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-11 w-auto',
    lg: 'h-14 sm:h-16 w-auto'
  }[size] : '';

  return (
    <img
      src={logoSaigonEyeHospital}
      alt="Bệnh viện Mắt Sài Gòn"
      width={180}
      height={50}
      loading="eager"
      decoding="async"
      className={`${dimensions} ${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

/**
 * Reusable Mắt Sài Gòn full logo using the SINGLE official image file
 */
export function FullLogo({ className = '', size }: LogoProps) {
  const dimensions = size ? {
    sm: 'h-9 sm:h-10 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-18 sm:h-20 w-auto'
  }[size] : '';

  return (
    <img
      src={logoSaigonEyeHospital}
      alt="Bệnh viện Mắt Sài Gòn"
      width={180}
      height={50}
      loading="eager"
      decoding="async"
      className={`${dimensions} ${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

export default logoSaigonEyeHospital;
