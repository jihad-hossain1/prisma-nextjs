// "use client";

// import React, { useState } from "react";
// import { items, subItems } from "./data";
// import { Item } from "../../utils/types";

// const SelectMenu: React.FC = () => {
//   const [menus, setMenus] = useState<Item[] | null>([]);

//   const [menu, setmenu] = useState<string | null>("");
//   const [subMenu, setsubmenu] = useState<string | null>("");

//   console.log({ menu, subMenu });

//   const handleChange = (e: {
//     target: { name: string; defaultValue: React.HTMLInputTypeAttribute };
//   }) => {
//     const name = e.target.name;
//     const defaultValue = e.target.defaultValue;

//     setmenu((pre) => ({
//       ...pre,
//       [name]: defaultValue,
//     }));

//     setmenu((pre) => ({
//       ...pre,
//       [name]: defaultValue,
//     }));
//   };

//   console.log("menu ", menu);
//   console.log("submenu", subMenu);
//   return (
//     <div>
//       {items?.map((itm, index) => (
//         <div key={index}>
//           <div>
//             <input
//               type="checkbox"
//               name="name"
//               defaultValue={itm?.name}
//               onChange={handleChange}
//               id=""
//             />
//             <label htmlFor="name" className="ml-1">
//               {itm?.name}
//             </label>
//           </div>
//           <div className="ml-6">
//             {subItems
//               ?.filter((it) => it.catId == it.id)
//               .map((_idm, index) => (
//                 <div key={index}>
//                   <input
//                     type="checkbox"
//                     name="name"
//                     defaultValue={_idm?.name}
//                     onChange={handleChange}
//                     id=""
//                   />
//                   <label htmlFor="name">{_idm?.name}</label>
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SelectMenu;

import React, { useEffect, useState } from "react";

const userData = [
  { name: "Jeevan" },
  { name: "Manish" },
  { name: "Prince" },
  { name: "Arti" },
  { name: "rahul" },
];

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  console.log(users);
  return (
    <div className="container my-4" style={{ width: "500px" }}>
      <form className="form w-100">
        <h3>Select Users</h3>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="allSelect"
            // checked={
            //   users.filter((user) => user?.isChecked !== true).length < 1
            // }
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <label className="form-check-label ms-2">All Select</label>
        </div>
        {users.map((user, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2">{user.name}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

const List = () => {
  const [data, setData] = useState([
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
      userId: 1,
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    },
    {
      userId: 1,
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    },
    {
      userId: 1,
      id: 6,
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  function checkboxHandler(e) {
    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  }

  function checkAllHandler() {
    if (data.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = data.map((item) => {
        return item.id;
      });

      setSelectedItems(postIds);
    }
  }

  return (
    <>
      <div className="container">
        <div className="left">
          {data.map((item, index) => (
            <div className="card" key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  value={item.id}
                  onChange={checkboxHandler}
                />
              </label>
              <h1>Id: {item.id}</h1>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <div className="right">
          <div className="results">
            <div>
              <button type="button" onClick={checkAllHandler}>
                {data.length === selectedItems.length
                  ? "Uncheck All"
                  : "Check all"}
              </button>
            </div>

            <h3>Result will print here: {selectedItems.toString()} </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
