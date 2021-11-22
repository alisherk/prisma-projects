import { makePersistedVar } from '../cache/storage';
import { useReactiveVar } from '@apollo/client'; 

const makeCar = makePersistedVar<any[]>([]);

export const PersistedVar: React.FC = () => {

 const values = useReactiveVar(makeCar)

  const handleClick = () => {
     makeCar([...values, 'BMW']) 
  }

  return (
    <p>
      <button onClick={handleClick}> Create </button>
      {values?.map((u: any) => (
        <h1 key={Math.random()}> {u}</h1>
      ))}
    </p>
  );
};
