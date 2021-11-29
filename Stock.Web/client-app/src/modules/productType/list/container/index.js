import React from "react";
import Presentation from "../presentation/index";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getProductTypes, getAll, fetchByFilters } from "../index";

const initialState = {
  filters: {
    initials: "",
    description: "",
    condition: "AND",
  },
};

class ProductTypePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  filterChanged = (event) => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };
    this.setState({ filters: newFilters });
  };

  render() {
    const { productTypes, loading, ...rest } = this.props;
    return (
      <Presentation
        data={productTypes}
        dataLoading={loading}
        defaultPageSize={5}
        filters={this.state.filters}
        handleFilter={this.filterChanged}
        submitFilter={() => this.props.fetchByFilters(this.state.filters)}
        clearFilter={this.props.getAll}
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
