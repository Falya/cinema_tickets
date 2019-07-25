import io from 'socket.io-client';
import { HOST_URL } from '../config/config';

export default function seatsSocket(params, getMethod) {
  const socket = io(HOST_URL);

  const handler = () => {
    getMethod(params);
  };

  socket.on('seat_satus_changed', handler);

  return () => {
    socket.disconnect();
  };
}
