import { Button } from "antd";
import React, { useEffect } from "react";
import "./result.scss";

import { HiOutlineSortAscending } from "react-icons/hi";
import { PiSortAscendingLight } from "react-icons/pi";

function UserResult() {
  const [userResult, setUserResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("ASC");

  console.log(userResult);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8001/user");
      const data = await response.json();
      setUserResult(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    console.log(id);

    function deleteData() {
      fetch(`http://localhost:8001/user/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    deleteData();
  };

  const handleSort = (columns) => {
    console.log(columns);
    const sortedData = userResult.sort((a, b) => {
      if (sort === "ASC") {
        return a[columns] > b[columns] ? 1 : -1;
      } else {
        return a[columns] < b[columns] ? 1 : -1;
      }
    });
    setSort(sort === "ASC" ? "DESC" : "ASC");
    setUserResult([...sortedData]);
  };

  const filterData = userResult.filter((item) => {
    const searchValue = search.toLowerCase();
    const correct = search.correctAnswer;
    const username = item.username?.toLowerCase() || "";
    const emai = item.email?.toLowerCase() || "";
    const totoalQuestion = item.totoalQuestion?.toLowerCase() || "";
    const correctAnswers = item.correctAnswer?.toLowerCase() || "";

    return (
      username.includes(searchValue) ||
      emai.includes(searchValue) ||
      totoalQuestion.includes(searchValue) ||
      correctAnswers.includes(correct)
    );
  });

  const columns = userResult.length > 0 ? Object.keys(userResult[0]) : [];
  const filterValue = columns.filter((item) => {
    return item !== "_id" && item !== "__v" && item !== '"correctAnswers"';
  });
  console.log(columns[0]);
  return (
    <div>
      <h1 className=" text-black justify-between  font-mono  ">User Result </h1>

      <div>
        <label htmlFor="search-form">
          <span>search</span>
          <input
            type="text"
            id="search form"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search here"
          />
        </label>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>{filterValue[0]}</th>
              <th>{filterValue[1]}</th>
              <th>{filterValue[2]}</th>
              <th onClick={() => handleSort(columns[3])}>
                <div>
                  {filterValue[3]}
                  {sort === "ASC" ? (
                    <HiOutlineSortAscending />
                  ) : (
                    <PiSortAscendingLight />
                  )}
                </div>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((user) => {
              return (
                <tr key={user.id}>
                  {filterValue.map((col) => {
                    return <td>{user[col]}</td>;
                  })}
                  <Button onClick={() => handleDelete(user._id)} className="  ">
                    delete
                  </Button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserResult;
