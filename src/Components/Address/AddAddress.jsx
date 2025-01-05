import React from "react";
import { AddressForm } from "./AddressForm";
import axios from "axios";

export const AddAddress = () => {

    const token = localStorage.getItem("token");

  const onhandleSubmit = (data) => {
    console.log(data, 'hi');
    const formData = {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        pincode: data.pincode,
        flatHouseNo: data.address1,
        areaStreet: data.address2,
        landmark: data.landmark,
        city: data.city,
        state:data.state,
        country: data.country
    }
    axios
    .post("http://localhost:3333/api/address", formData, {
        headers: {
          authorization: token,
        },
      })
    .then((res) => {
      console.log(res);
      document.getElementById("addAddress").close();      
    })
    .catch((err) => {
        console.log(err);
        
    });
  };
  return (
    <div>
      <dialog id="addAddress" className="modal">
        <div className="modal-box bg-white  w-11/12 max-w-3xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-black">Add Address</h3>
          <AddressForm onhandleSubmit={onhandleSubmit} />
        </div>
      </dialog>
    </div>
  );
};
