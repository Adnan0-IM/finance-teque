export const cardVariantLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
    },
  },
};

export const cardVariantRight = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
    },
  },
};

export const sectionVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
    },
  },
};

export const textVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
    },
  },
};

export const textVariantRight = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
    },
  },
};

export const imageVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120,
    },
  },
};
