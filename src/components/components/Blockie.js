import Blockies from "react-blockies";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie({ address, ...rest }) {
  return (
    <Blockies
      seed={address?.toLowerCase() ?? ''}
      {...rest}
    />
  );
}

export default Blockie;
