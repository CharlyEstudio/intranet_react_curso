import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

export default () => useContext(AuthContext);