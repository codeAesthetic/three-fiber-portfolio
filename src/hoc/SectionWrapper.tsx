import { motion } from 'framer-motion';
import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';

type ISectionWrapper = (
  Component: React.ElementType,
  idName: string
) => () => JSX.Element;

const SectionWrapper: ISectionWrapper = (Component, idName) => {
  return function HOC() {
    return (
      <motion.div
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} mx-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.div>
    );
  };
};

export default SectionWrapper;
