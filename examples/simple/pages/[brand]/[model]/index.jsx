const ModelPage = (props) => {
    return (
        <div>
            <h1>Selected model is: {props.year}</h1>
            <ul>
                <li>Selected brand is: {props.brand}</li>
            </ul>
        </div>
    );
};

ModelPage.getInitialProps = ({ query }) => {
    const { year, model, brand } = query;
    return {
        model: model,
        brand: brand
    }
};

export default ModelPage;