import axios from "axios";
import React, { useEffect, useState } from "react";

export const AddressList = ({handleDefaultAddress}) => {
  const [addressList, setAddressList] = useState([]);
  const [addressSelected, setAddressSelected] = useState('')

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/address", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setAddressList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const defaultAddress = JSON.parse(localStorage.getItem('user'))?.defaultAddress
    setAddressSelected(defaultAddress)
  }, [])  
  
  return (
    <div>
      <div className="card min-w-full border border-2 !text-black">
        <div className="card-body">
          <h2 className="card-title">Select Your Address</h2>
          <div className="divider"></div>
          <div>
            {addressList.map((address, index) => {
              return(
                <div key={index} className="form-control !text-black">
                  <label className="label !justify-start gap-3 cursor-pointer !text-black">
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio checked"
                      onChange={() => setAddressSelected(address)}
                      checked={addressSelected?._id === address?._id}
                    />
                    <span className="label-text !text-black">{`${address.fullName}, ${address.flatHouseNo}, ${address.areaStreet}, ${address.landmark} ${address.city}, ${address.state}, ${address.state}, ${address.country}, ${address.pincode}, ${address.mobileNumber}`}</span>
                  </label>
                </div>
              );
            })}
          </div> 
          <button
            className="flex items-start"
            onClick={() => document.getElementById("addAddress").showModal()}
          >
            Add address
          </button>
          <div className="divider"></div>
          <div className="card-actions">
            <button className="btn" onClick={() => handleDefaultAddress(addressSelected)}>Use this address</button>
          </div>
        </div>
      </div>
    </div>
  );
};
