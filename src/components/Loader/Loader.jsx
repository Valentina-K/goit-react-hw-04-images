import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="#3d19c0"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
    wrapperClassName="Loader"
    visible={true}
  />
);
export default Loader;
