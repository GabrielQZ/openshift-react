
import BorderCard from '../common/BorderCard'
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Dev = (props) => {

  const [git, setGit] = useState(null);

  const [loading, setLoading] = useState(true);

  const {name, cohort, github} = props.dev;

  useEffect(() => {
    const _getDevs = async () => {
      setLoading(true);
      const apiHost = "http://githubcon-api-gabrielcd1-dev.apps.sandbox.x8i5.p1.openshiftapps.com/v1"
      console.log(apiHost);
      try {
        const res = await axios.get(`${apiHost}/${github}`) 
        // console.log(res.data);
        setGit(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        console.log(err.res)
      }
    }
    _getDevs();
  },[setLoading, setGit])

  const totalCons = () => {
    if (git === null) return "Loading"
    let total = 0;
    git.years.forEach(year => {
      total += year.total;
    });

    return total;
  }

  return (
    <BorderCard style={{width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <div style={{flexDirection: 'column', margin: 10}} >
          <h2>Name</h2>
          <h2 style={{fontWeight: 'bold'}}>{name}</h2>
        </div>
        <div style={{flexDirection: 'column', margin: 10}}>
          <h2>Cohort</h2>
          <h2>{cohort}</h2>
        </div>
        
        <div style={{flexDirection: 'column', margin: 10}}>
          <h2>Github (total commits)</h2>
          <h2>{totalCons()}</h2>
        </div>

      </div>
    </BorderCard>
  )
}

export default Dev