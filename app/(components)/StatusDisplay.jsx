const StatusDisplay = ({ status }) => {
   const getColor = (status) => {
     // Nếu status không hợp lệ, trả về màu mặc định
     if (!status) return "bg-slate-700";
 
     const statusColors = {
       done: "bg-green-200",
       started: "bg-yellow-200",
       "not started": "bg-red-200",
     };
 
     // Trả về màu tương ứng với status hoặc màu mặc định
     return statusColors[status.toLowerCase()] || "bg-slate-700";
   };
 
   // Kiểm tra nếu status không có giá trị hợp lệ
   if (!status) return null;
 
   return (
     <span
       className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
         status
       )}`}
     >
       {status}
     </span>
   );
 };
 
 export default StatusDisplay;
 