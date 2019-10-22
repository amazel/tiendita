import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProductDetail extends React.Component<IProductDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Product [<b>{productEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="productName">Product Name</span>
            </dt>
            <dd>{productEntity.productName}</dd>
            <dt>
              <span id="imageURL">Image URL</span>
            </dt>
            <dd>{productEntity.imageURL}</dd>
            <dt>
              <span id="price">Price</span>
            </dt>
            <dd>{productEntity.price}</dd>
            <dt>
              <span id="discount">Discount</span>
            </dt>
            <dd>{productEntity.discount}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{productEntity.description}</dd>
            <dt>Category</dt>
            <dd>{productEntity.category ? productEntity.category.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/product" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/product/${productEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
