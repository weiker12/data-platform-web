import {useContext} from 'react';
import PermissionContext from '../context/permissionContext';

export default keys => {
  const {permissions} = useContext(PermissionContext);

  return keys.map(
    v => !!permissions.find(u => u.name === v || u.requestUrl === v),
  );
};
