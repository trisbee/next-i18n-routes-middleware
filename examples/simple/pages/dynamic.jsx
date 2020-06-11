import Layout from "./src/components/Layout";

const Dynamic = ({ query }) => {
  return (
      <Layout>
        <h1>Hello world, I am a dynamic page and x is {query ? query.x : 'undefined'}</h1>
      </Layout>
  );
};

Dynamic.getInitialProps = ({ query }) => {
  return { query }
};

export default Dynamic;