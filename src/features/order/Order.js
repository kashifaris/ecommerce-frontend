import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
} from './OrderSlice';

export function Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div>

      </div>
    </div>
  );
}
