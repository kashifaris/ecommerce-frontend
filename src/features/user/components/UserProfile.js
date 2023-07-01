import { useSelector, useDispatch } from "react-redux";
import {} from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

export function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const handelEdit=()=>{

  }
  const handelRemove=()=>{

  }
  return (
    <div>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name: {user.name? user.name : "new user"}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              email : {user.email}
            </h3>
          </div>

          <ul role="list" className="divide-y divide-gray-100">
            {user.addresses.map((address, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4 px-5">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pincode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {" "}
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {address.city}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                  onClick={(e)=>handelEdit(e,index)}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit
                  </button>
                  <button
                  onClick={(e)=>handelRemove(e,index)}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
