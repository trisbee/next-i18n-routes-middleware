import Layout from "../../../src/components/Layout";

const YearPage = (props) => {
    return (
        <Layout>
            <h1>Selected year is: {props.year}</h1>
            <ul>
                <li>Selected model is: {props.model}</li>
                <li>Selected brand is: {props.brand}</li>
            </ul>
        </Layout>
    );
};

YearPage.getInitialProps = ({ query }) => {
    const { year, model, brand } = query;
    return {
        year: year,
        model: model,
        brand: brand
    }
};

export default YearPage;