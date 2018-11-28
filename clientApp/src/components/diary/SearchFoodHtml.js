import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const SearchFoodHtml = props => {
  return (
    <div className="col-lg-8 offset-lg-2">
      <div
        className="card"
        style={{ backgroundColor: "whitesmoke", opacity: "0.95" }}
      >
        <div className="card-header text-center">
          <font style={{ fontSize: "22pt", font: "helvetica" }}>
            Search Database by Name
          </font>
        </div>
        <div className="card-body">
          <div className="row" style={{ margin: "12px" }}>
            <div className="col-md-6 offset-md-3 input-group">
              <input
                type="text"
                onChange={props.onChange}
                className="form-control"
                name="search"
              />
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn btn-dark btn-block"
                  onClick={props.searchFood}
                >
                  Search
                </button>
              </span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table" style={{ marginTop: "20px" }}>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Calories</th>
                  <th className="">
                    <span> </span>
                  </th>
                </tr>
              </thead>
              <tbody style={{ overflowY: "auto" }}>
                {props.foodArr.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-middle">
                        {item.brand_name_item_name}
                      </td>
                      <td className="align-middle">
                        {item.serving_qty} {item.serving_unit}
                      </td>
                      <td className="align-middle">{item.nf_calories}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          id={item.nix_item_id}
                          onClick={props.getNutrients}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SweetAlert
        warning
        showCancel
        style={{ bottom: "32%" }}
        show={props.confirmAdd}
        allowEscape={true}
        closeOnClickOutside={true}
        confirmBtnText="Add To Diary"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="default"
        title="Are you sure you want to add this item to your diary?"
        onConfirm={props.addFoodToDiary}
        onCancel={props.cancelBack}
      >
        <div>
          <p>
            <strong>Calories: </strong>
            {props.nutrientObj.calories === null
              ? "N/A"
              : props.nutrientObj.calories}
          </p>
          <p>
            <strong>Carbs: </strong>
            {props.nutrientObj.carbs === null ? "N/A" : props.nutrientObj.carbs}
          </p>
          <p>
            <strong>Fats: </strong>
            {props.nutrientObj.fats === null ? "N/A" : props.nutrientObj.fats}
          </p>
          <p>
            <strong>Proteins: </strong>
            {props.nutrientObj.proteins === null
              ? "N/A"
              : props.nutrientObj.proteins}
          </p>
        </div>
      </SweetAlert>
    </div>
  );
};

export default SearchFoodHtml;
