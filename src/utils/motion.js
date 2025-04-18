export const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
};