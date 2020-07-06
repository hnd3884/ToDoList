export async function GetWorks() {
    return await fetch('http://localhost:8081/get-works')
        .then(result => result.json())
}

export async function CheckDone(id, isdone) {
    return await fetch(`http://localhost:8081/check-work?id=${id}&isdone=${isdone}`, {
        method: 'PUT'
    })
}

export async function DeleteWork(id) {
    return await fetch('http://localhost:8081/delete-work', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: id
        })
    })
}

export async function GetWorkById(id) {
    return await fetch('http://localhost:8081/get-work?id=' + id)
        .then(result => result.json())
}

export async function ChangeDescription(id, newDescription) {
    return await fetch(`http://localhost:8081/update-work?id=${id}&newDescription=${newDescription}`, {
        method: 'PUT'
    })
}


