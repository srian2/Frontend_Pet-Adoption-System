// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert("You have been logged out successfully!");
//     navigate("/login");
//   };

//   return (
//     <nav
//       style={{
//         backgroundColor: "#6a00d6",
//         padding: "15px 30px",
//         borderRadius: "8px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: "1000",
//       }}
//     >
//       {/* Left Side - Logo */}
//       <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
//         🐾 AdoptMe
//       </div>

//       {/* Right Side - Links */}
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <Link
//           to="/dashboard"
//           style={{
//             color: "white",
//             margin: "0 15px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             textDecoration: "none",
//           }}
//         >
//           Home
//         </Link>
//         <Link
//           to="/addpet"
//           style={{
//             color: "white",
//             margin: "0 15px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             textDecoration: "none",
//           }}
//         >
//           Add Pet
//         </Link>
//         <Link
//           to="/adoption"
//           style={{
//             color: "white",
//             margin: "0 15px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             textDecoration: "none",
//           }}
//         >
//           Adoption
//         </Link>
//         <Link
//           to="/Profile"
//           style={{
//             color: "white",
//             margin: "0 15px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             textDecoration: "none",
//           }}
//         >
//         Profile
//         </Link>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           style={{
//             marginLeft: "15px",
//             background: "none",
//             border: "none",
//             color: "white",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             backgroundColor:"red",
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

