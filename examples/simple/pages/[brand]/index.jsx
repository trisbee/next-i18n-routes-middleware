const BrandPage = (props) => {
    return (
        <div>
            <h1>Selected brand is: {props.brand}</h1>
        </div>
    );
};

BrandPage.getInitialProps = ({ query }) => {
    const { year, model, brand } = query;

    console.log(query);

    return {
        brand: brand
    }
};

export default BrandPage;