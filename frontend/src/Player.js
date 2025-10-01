import React, { useState } from 'react';


export default function Player({ s3key }){
const [url, setUrl] = useState(null);
const [loading, setLoading] = useState(false);


async function getUrl(){
setLoading(true);
try{
const res = await fetch(`/api/presign?key=${encodeURIComponent(s3key)}`);
const data = await res.json();
setUrl(data.url);
}catch(e){
console.error(e);
alert('Failed to get presigned URL');
}finally{setLoading(false)}
}


return (
<div>
{!url ? (
<button onClick={getUrl} disabled={loading}>{loading? 'Loading...':'Play'}</button>
) : (
<video controls width="320" src={url} />
)}
</div>
);
}
