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
        <th scope="row">${user.name}</th>
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
        const input = document.querySelector("input[type=text]")
        input.addEventListener("input" , function(e){
            const valueOfInput = e.target.value
            const selected = document.querySelector("#selected").value
            const filteredUsers = data.filter(user => user[selected].toLowerCase().includes(valueOfInput))
            tableUser(filteredUsers)
        })
    } catch (error) {
       console.error(error) 
    }
}