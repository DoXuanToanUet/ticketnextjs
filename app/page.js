'use client'
import React, { useEffect, useState } from "react";
import TicketCard from "./(components)/TicketCard";

// Hàm gọi API để lấy danh sách tickets
const getTickets = async () => {
  try {
    const res = await fetch("/api/Tickets", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch tickets");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading tickets: ", error);
    return { tickets: [] }; // Trả về danh sách rỗng nếu có lỗi
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data.tickets);
      setLoading(false);
    };

    fetchTickets();
  }, []);

  // Kiểm tra khi chưa có dữ liệu hoặc đang tải
  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (tickets?.length === 0) {
    return <p>No tickets available.</p>;
  }

  // Lấy các danh mục duy nhất từ các ticket
  const uniqueCategories = [...new Set(tickets.map((ticket) => ticket.category))];

  return (
    <div className="p-5">
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket) => (
                  <TicketCard
                    key={filteredTicket._id}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
