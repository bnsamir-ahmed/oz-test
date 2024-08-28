import { useContext } from 'react'
import HeaderDetalGym from './HeaderDetalGym'
import DetalsGymlast from './DetalsGymlast'
import {AuthContext} from '../../apis/context/AuthTokenContext';
import { useParams } from 'react-router-dom';
import {getClassById} from '../../apis/ZeeStudio';
import { useQuery } from "@tanstack/react-query";

const GymDetails = () => {

  const { token } = useContext(AuthContext);
  const { id } = useParams();
  
    const { isPending, error, data } = useQuery({
      queryKey: ["gymClass-details"],
      queryFn: ({ signal }) => getClassById(token, id, signal),
    });

  return (
    <>
      <HeaderDetalGym details={data} pending={isPending} />
      <DetalsGymlast details={data} pending={isPending} />
    </>
  );
}

export default GymDetails