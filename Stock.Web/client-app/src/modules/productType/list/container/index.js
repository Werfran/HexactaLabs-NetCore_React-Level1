import React from "react";
import Presentation from "../presentation/index";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getProductTypes, getAll, fetchByFilters } from "../index";

const initialState = {
  name: "",
  address: "",
  condition: "AND",
};

class ProductTypePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  onFilterChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFilterSubmit = () => {
    this.props.fetchByFilters(this.state);
  };

  onFilterReset = () => {
    this.setState({ ...initialState });
    this.props.getAll();
  };

  render() {
    const { productTypes, loading, ...rest } = this.props;
    return (
      <Presentation
        data={productTypes}
        dataLoading={loading}
        defaultPageSize={5}
        filters={this.state}
        onFilterChange={this.onFilterChange}
        onFilterSubmit={this.onFilterSubmit}
        clearFilter={this.onFilterReset}
        {...rest}
      />
    );
  }
}

ProductTypePage.propTypes = {
  productTypes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAll: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  fetchByFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productType: getProductTypes(state),
});

const mapDispatchToProps = {
  getAll,
  push,
  fetchByFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypePage);
