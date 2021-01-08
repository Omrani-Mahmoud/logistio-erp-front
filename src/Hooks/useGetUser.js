
import jwt from 'jsonwebtoken'
function useGetUser(token) {
    return jwt.decode(token);
}

export default useGetUser
