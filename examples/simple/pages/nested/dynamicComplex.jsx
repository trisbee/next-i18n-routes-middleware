import Layout from "../src/components/Layout";

const DynamicComplex = ({ query }) => {
  return (
    <Layout>
      <h1>Hello world, I am a dynamicComplex page</h1>
      <p>X is {query ? query.x : 'undefined'}</p>
      <p>Y is {query ? query.y : 'undefined'}</p>
    </Layout>
  )
};

DynamicComplex.getInitialProps = ({ query }) => {
  return { query }
};

export default DynamicComplex;