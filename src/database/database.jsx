import React, { useEffect } from 'react';
import './database.css';
import { useNavigate } from 'react-router-dom';

export async function getDatabase(updateUseMsg) {
    const response = await fetch("/api/database", {method: "GET"})

    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        updateUseMsg("Error: authorization is not valid ");
        return []
    } else {
        updateUseMsg("Error: failed to load database, status " + response.status);
        return []
    }
}

export function Database({email, selectedUser, updateSelectedUser}) {
    //const [searchQuery, updateSearchQuery] = React.useState("")

    const [editsMsg, updateEditsMSG] = React.useState(JSON.parse(localStorage.getItem("editsMsg") || 'null') || [])

    const [inUseMsg, updateUseMsg] = React.useState("")
    const nav = useNavigate()
    let [listOfUsers, updateListOfUsers] = React.useState(JSON.parse(localStorage.getItem("listOfUsers")) || ["John H.", "Ellie S.", "Ian M.", "Alan G."])

    const [databaseCustomers, updateDatabase] = React.useState([])

    useEffect(() => {
        getDatabase(updateUseMsg).then(updateDatabase)
    }, [])

    async function reserveAccount() {
        const response = await fetch("/api/reserve", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uuid: selectedUser})
        });

        if (response.status === 200) {
            nav("/entrylookup")
        } else if (response.status === 401) {
            updateUseMsg("Error: authorization is not valid");
        } else if (response.status === 408) {
            response.json().then(updateEditsMSG);
        } else {
            updateUseMsg("Error: failed to reserve account, status " + response.status);
        }
    }

    /*useEffect(() => {
        const intervalID = setInterval(() => {
            let tempDatabase = JSON.parse(localStorage.getItem("database")) || databaseCustomers
            //This will be replaced by a websocket call
            const indexUsers = Math.floor(Math.random() * listOfUsers.length)

            const indexAccount = Math.floor(Math.random() * tempDatabase.length)
            let randomAccount = tempDatabase[indexAccount]

            if (randomAccount.checkedOut === "No" && listOfUsers.length > 0) {
                randomAccount = {...randomAccount, checkedOut: listOfUsers[indexUsers]}
                const updatedDatabase = [
                    ...tempDatabase.slice(0, indexAccount),
                    randomAccount,
                    ...tempDatabase.slice(indexAccount+1)
                ]
                localStorage.setItem("database", JSON.stringify(updatedDatabase))

                let newList = listOfUsers.filter(name => name !== listOfUsers[indexUsers])
                updateListOfUsers(newList)
                localStorage.setItem("listOfUsers", JSON.stringify(newList))
                
                updateDatabase(updatedDatabase)

                if(editsMsg.length < 10) {
                    const newMsg = [{msg: `${listOfUsers[indexUsers]} checked out ${randomAccount.name}`}].concat(editsMsg)
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                } else {
                    const newMsg = [{msg: `${listOfUsers[indexUsers]} checked out ${randomAccount.name}`}].concat(editsMsg.slice(0, -1))
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                }

            } else if (randomAccount.checkedOut !== "No" && randomAccount.checkedOut !== email) {
                let newList = listOfUsers.concat(randomAccount.checkedOut)
                const userCheckIn = randomAccount.checkedOut
                updateListOfUsers(newList)
                localStorage.setItem("listOfUsers", JSON.stringify(newList))

                randomAccount = {...randomAccount, checkedOut: "No"}
                const updatedDatabase = [
                    ...tempDatabase.slice(0, indexAccount),
                    randomAccount,
                    ...tempDatabase.slice(indexAccount+1)
                ]
                localStorage.setItem("database", JSON.stringify(updatedDatabase))
                updateDatabase(updatedDatabase)

                if(editsMsg.length < 10) {
                    const newMsg = [{msg: `${userCheckIn} checked in ${randomAccount.name}`}].concat(editsMsg)
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                } else {
                    const newMsg = [{msg: `${userCheckIn} checked in ${randomAccount.name}`}].concat(editsMsg.slice(0, -1))
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                }
            }
            //search()
        }, 5000)

        return () => {clearInterval(intervalID)}
    })*/

    useEffect(() => {
        updateSelectedUser("")
        for (let i = 0; i < databaseCustomers.length; i++) {
            if(databaseCustomers[i].checkedOut === email) {
                const account = {...databaseCustomers[i], checkedOut: "No"}
                const updatedDatabase = [
                    ...databaseCustomers.slice(0, i),
                    account,
                    ...databaseCustomers.slice(i+1)
                ]
                localStorage.setItem("database", JSON.stringify(updatedDatabase))
                updateDatabase(updatedDatabase)
                //search()
                if(editsMsg.length < 10) {
                    const newMsg = [{msg: `${email} checked in ${account.name}`}].concat(editsMsg)
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                } else {
                    const newMsg = [{msg: `${email} checked in ${account.name}`}].concat(editsMsg.slice(0, -1))
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                }
            }
        }
    }, [])

    /*function checkSelection() {
        
        const getUser = (selectedUser === "") ? "" : databaseCustomers.find(customer => customer.uuid === selectedUser)

        if(getUser === "") {
            updateUseMsg("Please Select An Account")
        } else if(getUser.checkedOut === "No") {
            const newUser = {...getUser, checkedOut: email}
            const newDatabase = [
                ...databaseCustomers.slice(0, databaseCustomers.indexOf(getUser)),
                newUser,
                ...databaseCustomers.slice(databaseCustomers.indexOf(getUser)+1)
            ]
            updateDatabase(newDatabase)

            if(editsMsg.length < 10) {
                    const newMsg = [{msg: `${email} checked out ${getUser.name}`}].concat(editsMsg)
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                } else {
                    const newMsg = [{msg: `${email} checked out ${getUser.name}`}].concat(editsMsg.slice(0, -1))
                    updateEditsMSG(newMsg)
                    localStorage.setItem("editsMsg", JSON.stringify(newMsg))
                }

            nav("/entrylookup")
        } else {
            updateUseMsg("This account is already in use by " + getUser.checkedOut)
        }
    }*/

    function findRow(row) {
        for (let i = 0; i < databaseCustomers.length; i++) {
            if(databaseCustomers[i].uuid === row.uuid) {
                updateSelectedUser(row.uuid)
                return
            }
        }
    }

    function displayCheckedOut(list) {
        if (list.length === 1) {
            return list[0]
        } else {
            return list[1]
        }
    }

  return (
          <main>
            <h1>Database</h1>

            <p>Logged in as: {email}.</p>
            <p>Selected User: {selectedUser === "" ? "" : databaseCustomers.find(customer => customer.uuid === selectedUser)?.name}</p>

            {/*
            <form id="search" onSubmit={(e) => searchSubmit(e)}>
                <input type="search" className="form-control" id="search-box" onChange={(e) => updateSearchQuery(e.target.value)} placeholder="Name or Email" />
                <button type="submit" className="btn btn-info" id="search-button" onSubmit={(e) => search(e)}>Search🔎</button>
            </form>*/}

            <br />

            <table className="table">
                <caption>
                    List of accounts in the system.
                    <form id="new-account-form" action="createaccount">
                        <button id="new-account-button">+</button>
                    </form>
                </caption>
                <thead>
                    <tr>
                        <th id="top-left" scope="col">Name</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Email</th>
                        <th scope="col">Type</th>
                        <th scope="col">Last Visit</th>
                        <th id="top-right" scope="col">Checked Out</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        databaseCustomers.map((row, idx) => {
                            return <tr key={idx}>
                                <td><button className="open-button" onClick={() => findRow(row)}>{row.name}</button></td>
                                <td><button className="middle-button" onClick={() => findRow(row)}>{row.birthday}</button></td>
                                <td><button className="middle-button" onClick={() => findRow(row)}>{row.email}</button></td>
                                <td><button className="middle-button" onClick={() => findRow(row)}>{row.type}</button></td>
                                <td><button className="middle-button" onClick={() => findRow(row)}>{row.lastVisit}</button></td>
                                <td><button className="close-button" onClick={() => findRow(row)}>{displayCheckedOut(row.checkedOut)}</button></td>
                            </tr>
                        })
                    }

                    <tr>
                        <td id="bottom-left"><button className="open-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td id="bottom-right"><button className="close-button">End of list</button></td>
                    </tr>
                </tbody>
            </table>

            <button className="btn btn-danger" onClick={reserveAccount} disabled={selectedUser === ""}>Check Out Selected Account</button>
            <p style={{color: "red"}}><b>{inUseMsg}</b></p>

            {
                editsMsg.map((msg, idx) => {
                    return <p key={idx}>{msg.msg}</p>
                })
            }
          </main>
  );
}