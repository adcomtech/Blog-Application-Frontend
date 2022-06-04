import React from 'react';
import { css } from '@emotion/react';
import RiseLoader from 'react-spinners/CircleLoader';

// This component will create loading Spinner

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const LoadingSpinner = () => {
  return <RiseLoader color='red' loading={true} css={override} />;
};
