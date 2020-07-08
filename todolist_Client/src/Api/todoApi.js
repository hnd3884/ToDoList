import {END_POINT} from '../config'

export async function GetWorks() {
    return await fetch(`${END_POINT}get-works`)
        .then(result => result.json())
}

export async function CheckDone(id, isdone) {
    return await fetch(`${END_POINT}check-work?id=${id}&isdone=${isdone}`, {
        method: 'PUT'
    })
}

export async function DeleteWork(id) {
    return await fetch(`${END_POINT}delete-work`, {
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
    return await fetch(`${END_POINT}get-work?id=` + id)
        .then(result => result.json())
}

export async function ChangeDescription(id, newDescription) {
    return await fetch(`${END_POINT}update-work?id=${id}&newDescription=${newDescription}`, {
        method: 'PUT'
    })
}

export async function AddWork(description) {
    return await fetch(`${END_POINT}add-work`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isdone: false,
            description: description
        })
    })
}


