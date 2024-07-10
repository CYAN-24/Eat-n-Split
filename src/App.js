import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriendButton, setAddFriendButton] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function toggleAddFriendButton() {
    setAddFriendButton(!addFriendButton);
  }

  function onSelectFriend(friend) {
    setSelectedFriend(selectedFriend?.id === friend.id ? null : friend);
    setAddFriendButton(false);
  }

  function handleSplitBill(amount) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + amount }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
        {addFriendButton ? (
          <>
            <FormAddFriend
              friends={friends}
              setAddFriendButton={setAddFriendButton}
            />
            <Button onClick={toggleAddFriendButton}>Close</Button>
          </>
        ) : (
          <Button onClick={toggleAddFriendButton}>Add friend</Button>
        )}
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          image={friend.image}
          name={friend.name}
          balance={friend.balance}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({
  friend,
  image,
  name,
  balance,
  onSelectFriend,
  selectedFriend,
}) {
  const isSelectedFriend = selectedFriend?.id === friend.id;

  return (
    <li className={isSelectedFriend ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">{`You owe ${name} ${Math.abs(balance)}€`}</p>
      )}
      {balance > 0 && <p className="green">{`${name} owes you ${balance}€`}</p>}
      {balance === 0 && <p>{`You and ${name} are even`}</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelectedFriend ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// function FormAddFriend({ friends, setAddFriendButton }) {
//   const [newName, setNewName] = useState("");
//   const [newImg, setNewImg] = useState("https://i.pravatar.cc/48");

//   function addFriend(e) {
//     e.preventDefault();
//     if (!newName && !newImg) return;
//     const newFriend = {
//       id: crypto.randomUUID(),
//       name: newName,
//       image: newImg,
//       balance: 0,
//     };
//     friends.push(newFriend);
//     setAddFriendButton(false);
//   }

//   return (
//     <form className="form-add-friend" onSubmit={addFriend}>
//       <label for="fname">👫 Friend name</label>
//       <input
//         value={newName}
//         id="fname"
//         onChange={(e) => setNewName(e.target.value)}
//       />
//       <label for="imageurl">🌄 Image URL</label>
//       <input
//         value={newImg}
//         id="imageurl"
//         onChange={(e) => setNewImg(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }

// function FormSplitBill({ selectedFriend, onSplitBill }) {
//   const [bill, setBill] = useState("");
//   const [userExpense, setUserExpense] = useState("");
//   const [paidBy, setPaidBy] = useState("user");

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!bill || !paidBy) return;
//     onSplitBill(paidBy === "user" ? bill - userExpense : -userExpense);
//   }

//   return (
//     <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
//       <h2>{`SPLIT A BILL WITH ${selectedFriend.name.toUpperCase()}`}</h2>

//       <label for="bill">💰 Bill value</label>
//       <input
//         value={bill}
//         id="bill"
//         onChange={(e) => setBill(Number(e.target.value))}
//       />

//       <label for="userexpense">🧍‍♀️ Your expense</label>
//       <input
//         value={userExpense}
//         id="userexpense"
//         onChange={(e) => setUserExpense(Number(e.target.value))}
//       />

//       <label for="friendexpense">{`👫 ${selectedFriend.name}'s expense`}</label>
//       <input value={bill - userExpense} id="friendexpense" disabled />

//       <label for="payer">🤑 Who is paying the bill</label>
//       <select
//         id="payer"
//         value={paidBy}
//         onChange={(e) => {
//           setPaidBy(e.target.value);
//         }}
//       >
//         <option value="user">You</option>
//         <option value="friend">{selectedFriend.name}</option>
//       </select>
//       <Button>Split bill</Button>
//     </form>
//   );
// }

function FormAddFriend({ friends, setAddFriendButton }) {
  const [newName, setNewName] = useState("");
  const [newImg, setNewImg] = useState("https://i.pravatar.cc/48");

  function addFriend(e) {
    e.preventDefault();
    if (!newName && !newImg) return;
    const newFriend = {
      id: crypto.randomUUID(),
      name: newName,
      image: newImg,
      balance: 0,
    };
    friends.push(newFriend);
    setAddFriendButton(false);
  }

  return (
    <form className="form-add-friend" onSubmit={addFriend}>
      <label>👫 Friend name</label>
      <input
        value={newName}
        id="fname"
        onChange={(e) => setNewName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        value={newImg}
        id="imageurl"
        onChange={(e) => setNewImg(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [paidBy, setPaidBy] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidBy) return;
    onSplitBill(paidBy === "user" ? bill - userExpense : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>{`SPLIT A BILL WITH ${selectedFriend.name.toUpperCase()}`}</h2>

      <label>💰 Bill value</label>
      <input
        value={bill}
        id="bill"
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        value={userExpense}
        id="userexpense"
        onChange={(e) => setUserExpense(Number(e.target.value))}
      />

      <label>{`👫 ${selectedFriend.name}'s expense`}</label>
      <input value={bill - userExpense} id="friendexpense" disabled />

      <label>🤑 Who is paying the bill</label>
      <select
        id="payer"
        value={paidBy}
        onChange={(e) => {
          setPaidBy(e.target.value);
        }}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default App;
