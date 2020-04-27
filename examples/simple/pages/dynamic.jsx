const Dynamic = ({ query }) => {
  return <h1>Hello world, I am a dynamic page and x is {query ? query.x : 'undefined'}</h1>
};

Dynamic.getInitialProps = ({ query }) => {
  return { query }
};

export default Dynamic;