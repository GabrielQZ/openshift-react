import React, {useState, useEffect} from 'react';
import Dev from './Dev';
import axios from 'axios';
import Spinner from '../common/Spinner';

const Devs = (props) => {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _getDevs = async () => {
      setLoading(true);
      const apiHost = process.env.REACT_APP_API_HOST || "http://localhost:4000"
      try {
        const res = await axios.get(`${apiHost}/api/developers`) 
        console.log(res.data);
        setDevs(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        console.log(err.res)
      }
    }
    _getDevs();
  },[setLoading, setDevs])

  const displayDevs = () => {
    return devs.map(dev => <Dev dev={dev} key={dev.id}/>)
  }

  return loading ? (
    <div style={{marginTop: '2em', justifyContent: 'center'}}>
      <Spinner />
    </div>
  ) : (
    <div style={{display: 'flex', flex: 1, flexDirection: 'column', width: '100%', justifyContent:'center', alignItems: 'center'}}>
      <h2 style={{textAlign: 'center'}}>Developers</h2>
      <div style={{display: 'flex', flexDirection: "column", maxWidth: '720px', justifyContent: 'center'}}>

      {displayDevs()}
      </div>
    </div>
  )
}

export default Devs;