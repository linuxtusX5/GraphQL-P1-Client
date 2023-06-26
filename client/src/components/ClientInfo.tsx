import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"

interface ClientType{
    id: string
    name: string
    email: string
    phone: string
}
interface Clientprops{
    client: ClientType
}
export default function ClientInfo({client}: Clientprops) {
  return (
    <>
        <h5 className="mt-5">Client Information</h5>
        <ul className="list-group">
            <li className="list-group-item">
                <FaIdBadge className="icon"/> {client.name}
            </li>
            <li className="list-group-item">
                <FaEnvelope className="icon"/> {client.email}
            </li>
            <li className="list-group-item">
                <FaPhone className="icon"/> {client.phone}
            </li>
        </ul>
    </>
  )
}
