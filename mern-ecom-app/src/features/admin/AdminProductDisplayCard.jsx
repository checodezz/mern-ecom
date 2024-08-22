import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { displayINRCurrency } from '../../utils/helpers';

const AdminProductDisplayCard = ({ product, onEdit }) => {
    return (
        <div className="col-lg-3 col-md-6">
            <div className="card h-100" style={{ width: "17rem" }}>
                <div className="d-flex justify-content-center align-items-center mx-auto mt-3" style={{ width: "12rem", height: "12rem" }}>
                    <img
                        className="img-fluid"
                        src={product?.images[0]}
                        alt={product?.name}
                        style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title text-truncate" style={{ maxWidth: "15rem" }}>{product.name}</h5>
                    <p className="card-text fw-bold">{displayINRCurrency(product.sellingPrice)}</p>
                    <div
                        className="position-absolute m-2 bottom-0 end-0 btn btn-outline-success p-2 rounded-circle"
                        data-bs-toggle="modal"
                        data-bs-target="#allProducts"
                        onClick={onEdit}
                    >
                        <MdModeEditOutline size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductDisplayCard;
