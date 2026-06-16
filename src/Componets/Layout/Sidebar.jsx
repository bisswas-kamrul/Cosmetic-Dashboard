import { Link } from "react-router";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaPlusCircle,
  FaBoxOpen,
  FaTags,
  FaList,
  FaEnvelope,
  FaBell,
  FaUsers,
  FaStore,
  FaStar,
  FaGift,
  FaRegUser,
  FaHeart,
  FaLock,
  FaCog,
} from "react-icons/fa";
const Sidebar = () => {
  return (
    <>
      <aside className="w-64  bg-gray-900 dark:bg-black text-white hidden md:block left-0 top-0">
        <div className="p-5 text-xl font-bold border-b border-gray-800">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaTachometerAlt />
            <Link to="/">Dashboard</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaShoppingCart />
            <Link to="/OrdersList">OrdersList</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaPlusCircle />
            <Link to="/ProductAdd">Product Add</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaBoxOpen />
            <Link to="/ProductList">Product List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaTags />
            <Link to="/CategoryAdd">Category Add</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaList />
            <Link to="/CategoryList">Category List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaEnvelope />
            <Link to="/ContactList">Contact List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaBell />
            <Link to="/SubscriberList">Subscriber List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaUsers />
            <Link to="/UserList">User List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaStore />
            <Link to="/VendorList">Vendor List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaStar />
            <Link to="/ReviewsList">Reviews List</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaGift />
            <Link to="/CreactCoupon">Create Coupon</Link>
          </div>

          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaGift />
            <Link to="/CouponList">All Coupon List</Link>
          </div>
          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaRegUser />
            <Link to="/Profile">Profile</Link>
          </div>
          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaHeart />
            <Link to="/Wishlist">Wishlist</Link>
          </div>
          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaBell />
            <Link to="/Notifications">Notifications</Link>
          </div>
          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaLock />
            <Link to="/Security">Security</Link>
          </div>
          <div className="p-2 rounded hover:bg-gray-800 flex items-center gap-3">
            <FaCog />
            <Link to="/Settings">Settings</Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
