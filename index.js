const displayNames = (data) => {
    const names = data.map(user => user.name)
    console.log(names)
}


const tableUser = (data) => {
    const container = document.querySelector(".user")
    const table = `
    <table class="table table-dark">
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Adress</th>
        </tr>
        </thead>
        <tbody>
        ${data.map(user => `
        <tr>
        <th scope="row"><a href="./infos.html?userId=${user.id}">${user.name}</a></th>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${Object.values(user.address)
            .filter(value => typeof value !== "object")
            .join(", ")}
        </td>
        </tr>
        `
        ).join("")}
        
        </tbody>
    </table>
    `

    container.innerHTML = table
    
}



window.onload = async () => {
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await resp.json()
        tableUser(data)
        displayNames(data)
        const input = document.querySelector("input[type=text]")
        input.addEventListener("input" , function(e){
            const valueOfInput = e.target.value
            const selected = document.querySelector("#selected").value
            const filteredUsers = data.filter(user => user[selected].toLowerCase().includes(valueOfInput))
            tableUser(filteredUsers)
        })
        const button = document.querySelector(".btn")
        button.addEventListener("click" , (e) =>{
            const sortNames = data.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase()
                ? 1 
                : a.name.toLowerCase() < b.name.toLowerCase()
                ? -1
                :0
            )
            console.log(sortNames)
            if(e.target.innerText === "Ascending"){
                e.target.innerText = "Descending"
                tableUser(sortNames)
            } else {
                e.target.innerText = "Ascending"
                tableUser(sortNames.reverse())
            }
        })
    } catch (error) {
       console.error(error) 
    }
}