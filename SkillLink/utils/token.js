const fs = require('fs')

export function authenticateToken(username, token) {
    const users = JSON.stringify(fs.readFileSync('data/loggedInUsers.json', 'utf-8'));
    const user = users.find(u => u.username == username);
    if (!user || user.token != token) return false;
    return true;
}
