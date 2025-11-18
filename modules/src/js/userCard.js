export function createUserCard(user) {
    return `<li class="list-group-item d-flex justify-content-between">
                <span>${user.name} (${user.age} jaar)</span>
                <span class="badge bg-primary">User</span>
            </li>`
}