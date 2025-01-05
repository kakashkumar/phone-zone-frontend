import React, { useEffect } from "react";

function PaymentList() {
  useEffect(() => {}, []);
  return (
    <div>
      <div className="card min-w-full border border-2 !text-black">
        <div className="card-body">
          <h2 className="card-title">Credit Cards & Debit Cards</h2>
          <div className="divider"></div>
          <div>
            <div className="form-control !text-black">
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                />
                <span><b>Axis bank credit card</b> ending in 1576 </span>
              </label>
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                />
                <span><b>ICICI bank credit card</b> ending in 0256 </span>
              </label>
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                />
                <span><b>Canara bank credit card</b> ending in 0806 </span>
              </label>
            </div>
            <h2 className="card-title mt-5">Another Payment Methods</h2>
          <div className="divider"></div>
          <div className="form-control !text-black">
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                  defaultChecked
                />
                <span>Credit or debit card</span>
              </label>
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                />
                <span>EMI</span>
              </label>
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                />
                <span>Other UPI methods</span>
              </label>
              <label className="label !justify-start gap-3 cursor-pointer !text-black">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio checked"
                />
                <span>Pay on Delivery</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
