import React, { useEffect, useState } from 'react';
import Player from './Player';


export default function App(){
const [videos, setVideos] = useState([]);


useEffect(()=>{
// fetch list of videos from backend
fetch('/api/videos')
.then(r=>r.json())
.then(setVideos)
.catch(err=>console.error(err));
},[]);


return (
<div className="app">
<header className="header">
<h1>My Netflix Clone</h1>
</header>
<main>
{videos.length===0 && <p>Loading videos...</p>}
<div className="grid">
{videos.map(v=> (
<div key={v.key} className="card">
<h3>{v.title}</h3>
<Player s3key={v.key} />
</div>
))}
</div>
</main>
</div>
);
}
