// import axios from "axios";
// import { useEffect, useState } from "react";

// const Chatbot = () => {
//   const API_URL = "http://127.0.0.1:8000/api/chatbot/";
//   const [items, setItems] = useState(null);
//   useEffect(() => {
//     axios.get(API_URL).then((response) => setItems(response.data));
//   }, []);

//   useEffect(() => {
//     console.log(items);
//   }, [items]);

//   return (
//     <>
//       <div>
//         <h1>Chats</h1>
//       </div>
//       <div>
//         {items}
//       </div>
//     </>
//   );
// };

// export default Chatbot;
