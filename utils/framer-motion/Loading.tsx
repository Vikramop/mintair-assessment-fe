import { motion } from 'framer-motion';
import React from 'react';

const LoadingDot = {
  display: 'block',
  width: '2rem',
  height: '2rem',
  backgroundColor: '#147487',
  borderRadius: '50%',
};

const LoadingContainer = {
  width: '10rem',
  height: '5rem',
  display: 'flex',
  justifyContent: 'space-around',
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
  end: {
    y: '0%',
  },
};

const DotTransition = {
  duration: 2,
  repeat: Infinity,
  ease: 'backInOut',
};

export default function Loading() {
  return (
    <div
      style={{
        paddingTop: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}
