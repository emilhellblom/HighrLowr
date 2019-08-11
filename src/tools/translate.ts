import sv from '../assets/sv';

const translate = (key, input) => {
  const str = sv[key][input];
  return str;
};

export default translate;