import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Input, Button } from "reactstrap";
import { MdSearch, MdCancel } from "react-icons/md";

const Search = (props) => {
  return (
    <React.Fragment>
      <h4>Búsqueda</h4>
      <Row>
        <Col>
          <Input
            name="initials"
            id="initialsInput"
            type="text"
            onChange={props.handleFilter}
            value={props.filters.initials}
            placeholder="Iniciales"
          />
        </Col>
        <Col>
          <Input
            name="description"
            id="descriptionInput"
            type="text"
            onChange={props.handleFilter}
            value={props.filters.description}
            placeholder="Descripcion"
          />
        </Col>
        <Col>
          <Button color="primary" onClick={props.submitFilter}>
            <MdSearch /> Buscar
          </Button>
          <Button color="primary" className="ml-3" onClick={props.clearFilter}>
            <MdCancel /> Limpiar
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

Search.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  submitFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Search;
