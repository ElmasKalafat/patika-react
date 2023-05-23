import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const GetData = () => {
  const [tableData, setTableData] = useState([]);
  const [postTable, setPostTable] = useState([]);

  const getData = async () => {
    try {
      const [usersRe, postsRe] = await axios.all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/posts"),
      ]);

      setTableData(usersRe.data);
      setPostTable(postsRe.data);
    } catch (error) {
      console.error("elmasss:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => (
        <span>
          {record.address.street}, {record.address.suite}, {record.address.city}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Title",
      dataIndex: "id",
      key: "title",
      render: (id) => {
        const post = postTable.find((item) => item.userId === id);
        return <span>{post ? post.title : ""}</span>;
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} bordered />;
};

export default GetData;
