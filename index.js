const tableUser = (data) => {
    const container = document.querySelector(".container")
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
        )}
        
        </tbody>
    </table>
    `

    container.innerHTML = table
    
}




window.onload = async () => {
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await resp.json()
        console.log(data)
    } catch (error) {
       console.error(error) 
    }
}