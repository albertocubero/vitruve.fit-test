import React from 'react';
import { Link } from 'react-router-dom';

const BackToHomeLink: React.FC = React.memo(() => (
  <Link to="/">Volver</Link>  
));

export default BackToHomeLink;
