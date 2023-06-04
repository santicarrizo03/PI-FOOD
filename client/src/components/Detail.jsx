import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailInfo = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
    {detailInfo.length > 0 ? 
    
    <div className='recipe-detail'>
        
        <h1>{detailInfo[0].name && detailInfo[0].name}</h1>
        <h5>id: {detailInfo[0].id}</h5>
        <img src={detailInfo[0].image} alt="not found" width="300px" height="300px" />
        {<p className='detail-type'><strong>Diet Type:</strong> {!detailInfo[0].createdInDb ? detailInfo[0].diets.map(e=>e + ', ') :  detailInfo[0].diets?.map(e=>e.name + ' ')}</p>}
        <p><strong>Summary:</strong>  { detailInfo[0].summary?.replace(/<[^>]*>/g, '') } </p>
        <p className='detail-type'><strong>Health score:</strong> {detailInfo[0].healthscore}</p>
        <p className='detail-type'><span>min value 0 </span><meter min="0" low="35" max="100" high="70" optimum="90" value={detailInfo[0].healthscore}>{detailInfo[0].healthscore}</meter><span>max value 100</span></p>
        <p><strong>Steps</strong></p>
        <ul>
            {Array.isArray(detailInfo[0].steps) ? detailInfo[0].steps.map((e,index)=>(
                <li key={index}>{e.number + ". " + e.step}</li>
                )) : detailInfo[0].steps}
        </ul>
    </div> : <p>Loading...</p>
}
<Link to="/home"><button>Go back home</button></Link>
</div>
  )
}
