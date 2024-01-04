import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { selectAccessToken } from '../redux/slices/authSlice'

declare module "jwt-decode" {
  export interface JwtPayload {
    username: string;
  }
}

const useAuth = () => {
  const token: string = useSelector(selectAccessToken)
  if (token) {
      const decoded = jwtDecode(token)
      const { username } = decoded

      return { username, token }
    }

    return { username: '' }
}
export default useAuth