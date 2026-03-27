import React, { useEffect } from 'react';
import './database.css';
import { useNavigate } from 'react-router-dom';
import { notifier } from "./checkoutNotifier.js";


export function Database({email, selectedUser, updateSelectedUser, viewingAccount, updateViewingAccount}) {
    //const [searchQuery, updateSearchQuery] = React.useState("")

    const [editsMsg, updateEditsMSG] = React.useState([])

    const [inUseMsg, updateUseMsg] = React.useState("")
    const nav = useNavigate()
    //let [listOfUsers, updateListOfUsers] = React.useState(JSON.parse(localStorage.getItem("listOfUsers")) || ["John H.", "Ellie S.", "Ian M.", "Alan G."])

    const [databaseCustomers, updateDatabase] = React.useState([])

    useEffect(() => {
        notifier.setMethod(handleMessage)
        if (viewingAccount === true) {
            helpOnLoad()
        }
        
        getDatabase().then(updateDatabase)
    }, [editsMsg])

    async function helpOnLoad() {
        updateViewingAccount(false)
        const response = await fetch("/api/account/" + selectedUser, {method: "GET"});

        if (response.status === 200) {
            const account = await response.json()
            if (account.checkedOut.length === 1) {
                let newMessage = `${email} has checked in ${account.name}`
                notifier.sendMessage(newMessage)
                if (editsMsg.length > 10) {
                    updateEditsMSG([newMessage, ...editsMsg.slice(0, 9)])
                } else {
                    updateEditsMSG([newMessage, ...editsMsg])
                }
            } else if (account.checkedOut[1] === email) {
                const response = await fetch("/api/checkin", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({uuid: selectedUser})
                })
                if (response.status === 200) {
                    let newMessage = `${email} has checked in ${account.name}`
                    if (editsMsg.length > 10) {
                        updateEditsMSG([newMessage, ...editsMsg.slice(0, 9)])
                    } else {
                        updateEditsMSG([newMessage, ...editsMsg])
                    }
                    notifier.sendMessage(newMessage)
                    getDatabase().then(updateDatabase)
                }
            }
        }
    }

    function handleMessage(message) {
        let newMessage = [message, ...editsMsg]
        if (newMessage.length > 10) {
            newMessage.pop()
        }
        updateEditsMSG(newMessage)
        getDatabase().then(updateDatabase)
    }

    async function reserveAccount() {
        const response = await fetch("/api/reserve", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uuid: selectedUser})
        });

        if (response.status === 200) {
            const user = databaseCustomers.find(customer => customer.uuid === selectedUser)
            let newMessage = `${email} has checked out ${user.name}`
            if (editsMsg.length > 10) {
                updateEditsMSG([newMessage, ...editsMsg.slice(0, 9)])
            } else {
                updateEditsMSG([newMessage, ...editsMsg])
            }    
            updateViewingAccount(true)
            notifier.sendMessage(newMessage)

            nav("/entrylookup")
        } else if (response.status === 401) {
            updateUseMsg("Error: authorization is not valid");
        } else if (response.status === 408) {
            response.json().then((res) => updateUseMsg(res.msg));
        } else {
            updateUseMsg("Error: failed to reserve account, status " + response.status);
        }
    }

    async function getDatabase() {
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

/*    useEffect(() => {
        const intervalID = setInterval(async () => {
            const randomUser = listOfUsers[Math.floor(Math.random() * listOfUsers.length)]
            const randomAccount = databaseCustomers[Math.floor(Math.random() * databaseCustomers.length)]

            if (randomAccount.checkedOut.length === 1 && randomUser) {
                const response = await fetch("/api/reserve/websocket", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({uuid: randomAccount.uuid, email: randomUser})
                })

                if (response.status === 200) {
                    getDatabase().then(updateDatabase)

                    let newMessage = [{msg: randomUser + " has checked out " + randomAccount.name}, ...editsMsg]
                    if (newMessage.length > 10) {
                        newMessage.pop()
                    }
                    localStorage.setItem("editsMsg", JSON.stringify(newMessage))
                    updateEditsMSG(newMessage)
                    
                    const newUsers = listOfUsers.filter(user => user !== randomUser)
                    updateListOfUsers(newUsers)
                    localStorage.setItem("listOfUsers", JSON.stringify(newUsers))
                }
            } else if (randomAccount.checkedOut.length >= 2 && randomAccount.checkedOut[1] !== email) {
                const username = randomAccount.checkedOut[1]
                const response = await fetch("/api/checkin/websocket", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({uuid: randomAccount.uuid, email: username})
                })
                if (response.status === 200) {
                    getDatabase().then(updateDatabase)

                    let newMessage = [{msg: username + " has checked in " + randomAccount.name}, ...editsMsg]
                    if (newMessage.length > 10) {
                        newMessage.pop()
                    }
                    localStorage.setItem("editsMsg", JSON.stringify(newMessage))
                    updateEditsMSG(newMessage)

                    const newUsers = [...listOfUsers, username]
                    updateListOfUsers(newUsers)
                    localStorage.setItem("listOfUsers", JSON.stringify(newUsers))
                }
            }
        }, 5000)

        return () => {clearInterval(intervalID)}
    }, [])*/

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
                                <td><button className="open-button" onClick={() => updateSelectedUser(row.uuid)}>{row.name}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row.uuid)}>{row.birthday}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row.uuid)}>{row.email}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row.uuid)}>{row.type}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row.uuid)}>{row.lastVisit}</button></td>
                                <td><button className="close-button" onClick={() => updateSelectedUser(row.uuid)}>{displayCheckedOut(row.checkedOut)}</button></td>
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
                    return <p key={idx}>{msg}</p>
                })
            }
          </main>
  );
}