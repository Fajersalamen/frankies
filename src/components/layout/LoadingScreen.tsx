'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LOADER_EXIT_MS, LOADER_HOLD_MS } from '@/lib/timing';
import { BrandMark } from '../ui/BrandMark';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), LOADER_HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: LOADER_EXIT_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-5 bg-fc-cream"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <BrandMark className="h-14 w-14" background="transparent" />
            <span className="font-fc-serif text-3xl italic text-fc-cocoa">Frankies</span>
          </motion.div>
          <div className="h-px w-28 overflow-hidden bg-fc-cocoa/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: LOADER_HOLD_MS / 1000, ease: [0.45, 0, 0.15, 1] }}
              className="h-full w-full bg-fc-gold"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
