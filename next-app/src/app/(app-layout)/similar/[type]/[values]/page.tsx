"use client";

import { useEffect } from 'react';
import SimilarWrapperServer, {type SimilarWrapperProps } from '@/similar/similar-wrapper';

export default function SimilarWrapper({ params }: SimilarWrapperProps) {
  useEffect(() => {
    // Disable scrolling
    document.body.classList.add('no-scroll');
    
    // Re-enable scrolling when the component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return <SimilarWrapperServer params={params} />;
}
