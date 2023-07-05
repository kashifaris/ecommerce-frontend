import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/OrderSlice";
import { useState } from "react";
import Pagination from "../../common/Pagination";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../../app/const";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const ordres = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    console.log("handle edit");
    setEditableOrderId(order.id);
  };
  const handleShow = (order) => {
    console.log("handle show");
    console.log("total orders", totalOrders);
  };

  const handleUpdateStatus = (e, order) => {
    console.log(e.target.value);
    const updatedOrder = { ...order, orderStatus: e.target.value };
    setEditableOrderId(-1);
    dispatch(updateOrderAsync(updatedOrder));
  };

  const handleSort = (sortHead) => {
    console.log(sortHead);
    const sort = { _sort: sortHead.sort, _order: sortHead.order };
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto mt-0 pt-0">
        <div className="min-w-screen min-h-scree flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                      Order Number
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                      Total Amount
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {ordres.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <div className="mr-2">
                            {order.items.map((item) => (
                              <img
                              alt={item.title}
                                className="w-8 h-8 mt-1 rounded-full"
                                src={item.thumbnail}
                              />
                            ))}
                          </div>
                          <span>{order.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="">
                          <div>
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>
                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city}, </div>
                          <div>{order.selectedAddress.state}, </div>
                          <div>{order.selectedAddress.pincode}, </div>
                          <div>{order.selectedAddress.phone}, </div>
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            onChange={(e) => handleUpdateStatus(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.orderStatus
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.orderStatus}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              className="w-8 h-8"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <PencilIcon
                              className="w-8 h-8"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          handlePage={handlePage}
          totalItems={totalOrders}
          page={page}
        ></Pagination>
      </div>
    </>
  );
}

export default AdminOrders;
