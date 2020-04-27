const DynamicComplex = ({ query }) => {
  return <div>
    <h1>Hello world, I am a dynamicComplex page</h1>
    <p>X is {query ? query.x : 'undefined'}</p>
    <p>Y is {query ? query.y : 'undefined'}</p>
  </div>
};

DynamicComplex.getInitialProps = ({ query }) => {
  return { query }
};

export default DynamicComplex;