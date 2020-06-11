import Layout from "../src/components/Layout";

const BrandPage = (props) => {
    return (
        <Layout>
            <h1>Selected brand is: {props.brand}</h1>
        </Layout>
    );
};

BrandPage.getInitialProps = ({ query }) => {
    const { brand } = query;
    return {
        brand: brand
    }
};

export default BrandPage;