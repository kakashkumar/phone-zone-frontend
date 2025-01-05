import React, { useEffect, useState } from "react";

function Address({ user }) {
  const [defaultAddress, setDefaultAddress] = useState(user?.defaultAddress);

  // Update the local state if `user.defaultAddress` changes
  useEffect(() => {
    setDefaultAddress(user?.defaultAddress);
  }, [user?.defaultAddress]);

  return (
    <div>
      <div className="btn btn-ghost text-xl content-center">
        {user?.defaultAddress ? (
          <div className="flex flex-col items-start ">
            <p>{`Deliver to ${defaultAddress?.fullName}`}</p>
            <p>{`${defaultAddress?.city} ${defaultAddress?.pincode}`}</p>
          </div>
        ) : (
          "Set Default Address"
        )}
      </div>
    </div>
  );
}

export default Address;
